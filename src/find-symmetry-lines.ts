// Toggle debug logging.
const DEBUG = true;

// Error tolerance in distance unit.
// Do not use for tolerance in line coefficient units.
const EPSILON = 0.000001;

// x and y bounds used in colinearity checks
const X_LOWER_BOUND = -1000;
const X_UPPER_BOUND = 1000;
const Y_LOWER_BOUND = -1000;
const Y_UPPER_BOUND = 1000;

export function findSymmetryLines(points: Point[]): Line[] {
  const candidateLines = findCandidateSymmetryLines(points);
  debug('candidateLines', candidateLines);
  const symmetryLines = candidateLines.filter((line) => doesLineReflectAllPoints(line, points));
  return symmetryLines;
}

function findCandidateSymmetryLines(points: Point[]): Line[] {
  const lines: Line[] = [];
  const pairs = findPointPairs(points);
  const centerPoint = findCenterPoint(points);
  debug('center point', centerPoint);
  // Keep only those lines which:
  // 1. Pass through global center. All lines of symmetry pass through global center.
  // 2. Have a unique slope (within error tolerance); there can be only one line
  //    for each slope that also passes through global center.
  pairs.forEach((pair) => {
    debug();
    const crossLine: Line = {
      p1: pair[0],
      p2: pair[1],
    };
    debug('cross line:', crossLine);
    if (isPointOnLine(centerPoint, crossLine)) {
      debug('center point is on cross line');
      lines.push(crossLine);
    }
    // midpoint on crossLine is also point on normalLine
    const midpoint: Point = {
      x: (crossLine.p1.x + crossLine.p2.x) / 2,
      y: (crossLine.p1.y + crossLine.p2.y) / 2,
    };
    const normalLine: Line = createNormalLine(crossLine, midpoint);
    debug('normal line:', normalLine)
    if (isPointOnLine(centerPoint, normalLine)) {
      debug('center point is on normal line');
      lines.push(normalLine);
    }
  });
  // Deduplicate lines by slope. First sort lines by slope for faster comparisons.
  const linesSortedBySlope = lines.slice().sort((a, b) => findLineSlope(a) - findLineSlope(b));
  debug(`Candidate lines, sorted, unfiltered (${linesSortedBySlope.length}):`, linesSortedBySlope);
  // Output lines will also end up sorted by slope.
  const linesOut: Line[] = [];
  if (linesSortedBySlope.length === 0) {
    return linesOut;
  }
  // Start with first slope.
  linesOut.push(linesSortedBySlope[0]);
  for (let i = 1; i < linesSortedBySlope.length; i++) {
    const prevLine = linesOut[linesOut.length - 1];
    const currLine = linesSortedBySlope[i];
    debug('Comparing lines:', prevLine, currLine);
    const areLinesColinear = isColinear(prevLine, currLine);
    debug('Are lines are colinear?', areLinesColinear);
    if (areLinesColinear) {
      // current and previous line are the same
      continue;
    }
    linesOut.push(currLine)
  }
  return linesOut;
}

function doesLineReflectAllPoints(line: Line, points: Point[]): boolean {
  // O(N^2)
  return points.every((point) => {
    const reflectedPoint = reflectPointAcrossLine(point, line);
    return Boolean(points.find((otherPoint) => {
      return (
        isNearZero(reflectedPoint.x - otherPoint.x) &&
        isNearZero(reflectedPoint.y - otherPoint.y)
      );
    }));
  });
}

// Return list of point pairs, unrepeated.
function findPointPairs(points: Point[]): [Point, Point][] {
  // N choose 2
  const pairs: [Point, Point][] = [];
  for (let p = 0; p < points.length - 1; p++) {
    for (let q = p + 1; q < points.length; q++) {
      const pair: [Point, Point] = [
        points[p],
        points[q],
      ];
      pairs.push(pair);
    }
  }
  return pairs;
}

// Return the average point for a set of points.
function findCenterPoint(points: Point[]): Point {
  // average point
  const px = points.reduce((sum, point) => sum + point.x, 0) / points.length;
  const py = points.reduce((sum, point) => sum + point.y, 0) / points.length;
  const p: Point = {
    x: px,
    y: py,
  };
  return p;
}

function isPointOnLine(point: Point, line: Line): boolean {
  debug('is point on line?', point, line);
  let isPointOnLine: boolean;
  if (isLineHorizontal(line)) {
    isPointOnLine = isNearZero(point.y - line.p1.y);
  } else if (isLineVertical(line)) {
    isPointOnLine = isNearZero(point.x - line.p1.x);
  } else {
    const slope = findLineSlope(line);
    debug('slope', slope);
    if (-1 < slope && slope < 1) {
      const y = calculateLineY(line, point.x);
      debug('last case', y, point.y);
      isPointOnLine = isNearZero(y - point.y);
    } else {
      const x = calculateLineX(line, point.y);
      debug('last case', x, point.x);
      isPointOnLine = isNearZero(x - point.x);
    }
  }
  return isPointOnLine;
}

// Create line perpendicular to given line that passes through given point.
function createNormalLine(line: Line, point: Point): Line {
  // other point on normal line should be different from given point
  let otherPoint: Point;
  if (isLineHorizontal(line)) {
    otherPoint = {
      x: point.x,
      y: point.y + 1,
    };
  } else if (isLineVertical(line)) {
    otherPoint = {
      x: point.x + 1,
      y: point.y,
    };
  } else {
    // Solve line 1 for a, b given two points P1, P2:
    //   y = ax + b
    //   a = (P2.y - P1.y) / (P2.x - P1.x)
    //   b = P2.y - a * P2.x

    // Solve line 2 for a', b' given one point P3 and knowing that line 2 is perpendicular to line 1:
    //   y = a'x + b
    //   a' = (P1.x - P2.x) / (P2.y - P1.y) [negative reciprocal of a]
    //   b' = P3.y - a' * P3.x

    // 1st order polynomial coefficient, a'
    const a = (line.p1.x - line.p2.x) / (line.p2.y - line.p1.y);
    // 0th order polynomial coefficient, b'
    const b = point.y - a * point.x;
    otherPoint = {
      x: point.x + 1,
      y: a * (point.x + 1) + b,
    };
  }
  const normalLine: Line = {
    p1: point,
    p2: otherPoint,
  };
  return normalLine;
}

function reflectPointAcrossLine(point: Point, line: Line): Point {
  const projectedPoint = projectPointOntoLine(point, line);
  const dx = projectedPoint.x - point.x;
  const dy = projectedPoint.y - point.y;
  const reflectedPoint: Point = {
    x: point.x + 2 * dx,
    y: point.y + 2 * dy,
  };
  return reflectedPoint;
}

function projectPointOntoLine(point: Point, line: Line): Point {
  let intersectionPoint: Point;
  if (isLineHorizontal(line)) {
    intersectionPoint = {
      x: point.x,
      y: line.p1.y,
    };
  } else if (isLineVertical(line)) {
    intersectionPoint = {
      x: line.p1.x,
      y: point.y,
    };
  } else {
    const normal = createNormalLine(line, point);
    // Intersect lines. Lines are guaranteed to intersect because they're perpendicular.
    // Solve for x, y:
    //   y = ax + b
    //   y = a'x + b'
    //   ---
    //   x = (b' - b) / (a - a')
    //   y = a * (b' - b) / (a - a') + b
    const a = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
    const b = line.p2.y - a * line.p2.x;
    const aPrime = (normal.p2.y - normal.p1.y) / (normal.p2.x - normal.p1.x);
    const bPrime = normal.p2.y - aPrime * normal.p2.x;
    intersectionPoint = {
      x: (bPrime - b) / (a - aPrime),
      y: a * (bPrime - b) / (a - aPrime) + b,
    };
  }
  return intersectionPoint;
}

function isLineHorizontal(line: Line): boolean {
  return isNearZero(line.p1.y - line.p2.y);
}

function isLineVertical(line: Line): boolean {
  return isNearZero(line.p1.x - line.p2.x);
}

// Returns a number or Infinity (and never negative Infinity).
function findLineSlope(line: Line): number {
  // Solve for a, b given two points P1, P2:
  //   y = ax + b
  //   a = (P2.y - P1.y) / (P2.x - P1.x)
  //   b = P2.y - a * P2.x
  const slope = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
  if (isFinite(slope)) {
    return slope;
  }
  return Infinity;
}

// Are two lines the same (within error tolerance)?
function isColinear(line1: Line, line2: Line): boolean {
  let isColinear: boolean;
  if (isLineHorizontal(line1)) {
    isColinear = isLineHorizontal(line2) && isNearZero(line1.p1.y - line2.p1.y);
  } else if (isLineVertical(line1)) {
    isColinear = isLineVertical(line2) && isNearZero(line1.p1.x - line2.p1.x);
  } else if (isLineHorizontal(line2)) {
    return false;
  } else if (isLineVertical(line2)) {
    return false;
  } else {
    // By this point, Lines 1 and 2 are guaranteed not to be horizontal or vertical.
    // calculateLine functions will never throw.

    // compare two points on both lines. each pair should be the same (within error tolerance)
    const slope1 = findLineSlope(line1);
    if (-1 < slope1 && slope1 < 1) {
      // use x bounds to compute y
      try {
        const y1line1 = calculateLineY(line1, X_LOWER_BOUND);
        const y1line2 = calculateLineY(line2, X_LOWER_BOUND);
        const y2line1 = calculateLineY(line1, X_UPPER_BOUND);
        const y2line2 = calculateLineY(line2, X_UPPER_BOUND);
        // lines are colinear if each pair of points are the same (within error tolerance)
        isColinear = isNearZero(y1line1 - y1line2) && isNearZero(y2line1 - y2line2);
      } catch (e) {
        isColinear = false;
      }
    } else {
      // use y bounds to compute x
      const x1line1 = calculateLineX(line1, Y_LOWER_BOUND);
      const x1line2 = calculateLineX(line2, Y_LOWER_BOUND);
      const x2line1 = calculateLineX(line1, Y_UPPER_BOUND);
      const x2line2 = calculateLineX(line2, Y_UPPER_BOUND);
      // lines are colinear if each pair of points are the same (within error tolerance)
      isColinear = isNearZero(x1line1 - x1line2) && isNearZero(x2line1 - x2line2);
    }
  }
  return isColinear;
}

// Calculate x given y. Throw if line is horizontal (no x).
function calculateLineX(line: Line, y: number): number {
  if (isLineHorizontal(line)) {
    throw new Error('Cannot calculate x for any y on a horizontal line');
  } else if (isLineVertical(line)) {
    return line.p1.x;
  } else {
    // Solve for a, b given two points P1, P2:
    //   y = ax + b
    //   a = (P2.y - P1.y) / (P2.x - P1.x)
    //   b = P2.y - a * P2.x
    //   x = (y - b) / a
    const a = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
    const b = line.p2.y - a * line.p2.x;
    const x = (y - b) / a;
    return x;
  }
}

// Calculate y given x. Throw if line is vertical (no y).
function calculateLineY(line: Line, x: number): number {
  if (isLineHorizontal(line)) {
    return line.p1.y;
  } else if (isLineVertical(line)) {
    throw new Error('Cannot calculate y for any x on a vertical line');
  } else {
    // Solve for a, b given two points P1, P2:
    //   y = ax + b
    //   a = (P2.y - P1.y) / (P2.x - P1.x)
    //   b = P2.y - a * P2.x
    const a = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
    const b = line.p2.y - a * line.p2.x;
    debug(line.p2.x, line.p2.y, a, b, x);
    const y = a * x + b;
    return y;
  }
}

// Determine if a number is "zero" or less than some small value epsilon.
// Rounded floating point numbers are often close but not exact.
function isNearZero(value: number): boolean {
  return Math.abs(value) < EPSILON;
}

function debug(...args: any[]) {
  if (DEBUG) {
    console.debug(...args);
  }
}

export interface Point {
  x: number;
  y: number;
}

export interface Line {
  // A line is defined by two points, which should not be the same.
  p1: Point;
  p2: Point;
}
