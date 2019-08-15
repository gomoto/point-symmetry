import { Point, Line } from './interfaces';
import { rotatePoint } from './rotate-point';

// Toggle debug logging.
const DEBUG = true;

// Error tolerance in distance unit.
// Do not use for tolerance in line coefficient units.
const EPSILON = 1e-4;

export function findSymmetryLines(points: Point[]): Line[] {

  // Find global center among all points.
  const globalCenter = findCenterPoint(points);
  debug(() => {
    console.log('globalCenter');
    console.table(globalCenter);
  });

  // Create candidate lines connecting global center and each point + midpoint.
  const candidateLines = findCandidateLines2(points);
  // const candidateLines = findCandidateLines(points);
  debug(() => {
    console.log('candidateLines');
    console.table(candidateLines);
  });

  // Sort by distance from global center? To start with candidates with stable lines.

  // Find first line that reflects all points. That line is one of the lines of symmetry.
  const firstLine = candidateLines.find((line) => doesLineReflectAllPoints(line, points));
  debug(() => {
    console.log('firstLine');
    console.table(firstLine);
  });

  if (!firstLine) {
    return [];
  }

  // Find the remaining lines by rotating the first line.
  // For N points, there are at most N lines of symmetry.
  // The number of lines of symmetry is a factor of N or N - 1 (when one point coincides with the global center).
  // For each factor in decreasing order starting from N, rotate the first line by 2π/N.
  // Return the first factor where all points are reflected by the rotated line.
  const N = points.length;
  const factors = [
    ...factorize(N),
    ...factorize(N-1),
  ].slice().sort().reverse();
  debug(() => {
    console.log('factors');
    console.log(factors);
  });

  const factor = factors.find((factor) => {
    const radians = Math.PI / factor;
    const rotatedLine = rotateLine(firstLine, radians, globalCenter);
    return doesLineReflectAllPoints(rotatedLine, points);
  })!; // There will always be at least one factor (1) that reflects all points
  debug(() => {
    console.log('factor');
    console.log(factor);
  });

  // There are `factor` number of lines of symmetry. Expand on the first line by rotating it `factor` times.
  const lines: Line[] = [];
  for (let f = 0; f < factor; f++) {
    console.log('asdf', firstLine, f * Math.PI / N, globalCenter);
    lines.push(rotateLine(firstLine, f * Math.PI / N, globalCenter));
  }
  debug(() => {
    console.log('lines');
    console.table(lines);
  });

  return lines;
}

function findCandidateLines2(points: Point[]): Line[] {
  const pairs = findPointPairs(points);
  const midpoints = pairs.map((pair) => findCenterPoint(pair));

  // Find global center among all points.
  const globalCenter = findCenterPoint(points);

  // Create candidate lines connecting global center and each point + midpoint.
  const candidateLines = [...points, ...midpoints]
  .map<Line>((point) => ({p1: point, p2: globalCenter}))
  .filter((line) => !(isNearZero(line.p1.x - line.p2.x) && isNearZero(line.p1.y - line.p2.y)));

  return candidateLines;
}

function findCandidateLines(points: Point[]): Line[] {
  const candidates: Line[] = [];
  const pairs = findPointPairs(points);
  pairs.forEach((pair) => {
    // Each pair has two potential symmetry lines, one that passes through the
    // points and one normal to that line that also passes through the midpoint
    // of the pair of points.
    const crossLine: Line = {
      p1: pair[0],
      p2: pair[1],
    };
    candidates.push(crossLine);
    // midpoint of crossLine is a point on normalLine
    const midpoint: Point = {
      x: (crossLine.p1.x + crossLine.p2.x) / 2,
      y: (crossLine.p1.y + crossLine.p2.y) / 2,
    };
    const normalLine: Line = createNormalLine(crossLine, midpoint);
    candidates.push(normalLine);
  });
  return candidates;
}

function rotateLine(line: Line, radians: number, around: Point): Line {
  const rotatedP1 = rotatePoint({x: line.p1.x - around.x, y: line.p1.y - around.y}, radians);
  const rotatedP2 = rotatePoint({x: line.p2.x - around.x, y: line.p2.y - around.y}, radians);
  const lineOut: Line = {
    p1: {x: rotatedP1.x + around.x, y: rotatedP1.y + around.y},
    p2: {x: rotatedP2.x + around.x, y: rotatedP2.y + around.y},
  };
  return lineOut;
}

// Return all factors of a number, largest first.
function factorize(n: number): number[] {
  const out: number[] = [];
  for (let i = n; i >= 1; i--) {
    if (n % i === 0) {
      out.push(i);
    }
  }
  return out;
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
  const px = points.reduce((sum, point) => sum + point.x, 0) / points.length;
  const py = points.reduce((sum, point) => sum + point.y, 0) / points.length;
  const p: Point = {
    x: px,
    y: py,
  };
  return p;
}

function doesLineReflectAllPoints(line: Line, points: Point[]): boolean {
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

// Determine if a number is "zero" or less than some small value epsilon.
// Rounded floating point numbers are often close but not exact.
function isNearZero(value: number): boolean {
  return Math.abs(value) < EPSILON;
}

// Return point resulting from reflection of given point across given line.
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

// Return point resulting from projection of given point onto given line.
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

// Create line perpendicular to given line that passes through given point.
function createNormalLine(line: Line, point: Point): Line {
  // Points on returned line must be different points.
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

function debug(fn: () => void) {
  if (DEBUG) {
    fn();
  }
}