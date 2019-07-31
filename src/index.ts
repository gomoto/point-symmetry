main();

function main(): void {
  console.log('Isosceles triangle');
  const isoscelesPoints = [
    {x: -1, y: 0},
    {x: 0, y: 3},
    {x: 1, y: 0},
  ];
  console.table(findAllSymmetryLines(isoscelesPoints));

  console.log('Square');
  const squarePoints = [
    {x: -1, y: -1},
    {x: 1, y: -1},
    {x: -1, y: 1},
    {x: 1, y: 1},
  ];
  console.table(findAllSymmetryLines(squarePoints));

  console.log('Rectangle');
  const rectanglePoints = [
    {x: -3, y: -1},
    {x: 3, y: -1},
    {x: -3, y: 1},
    {x: 3, y: 1},
  ];
  console.table(findAllSymmetryLines(rectanglePoints));

  console.log('Rotated square');
  const rotatedSquarePoints = [
    {x: 0, y: 1},
    {x: 0, y: -1},
    {x: 1, y: 0},
    {x: -1, y: 0},
  ];
  console.table(findAllSymmetryLines(rotatedSquarePoints));

  console.log('Rhombus');
  const rhombusPoints = [
    {x: 0, y: 1},
    {x: 0, y: -1},
    {x: 2, y: 0},
    {x: -2, y: 0},
  ];
  console.table(findAllSymmetryLines(rhombusPoints));

  console.log('Kite');
  const kitePoints = [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -5},
  ];
  console.table(findAllSymmetryLines(kitePoints));
}

function findAllSymmetryLines(points: Point[]): Line[] {
  const candidateLines = findCandidateSymmetryLines(points);
  console.log('candidateLines', candidateLines);
  const symmetryLines = candidateLines.filter((line) => doesLineReflectAllPoints(line, points));
  return symmetryLines;
}

function findCandidateSymmetryLines(points: Point[]): Line[] {
  const candidateLines: Line[] = [];
  const pairs: MultiPoint[] = findPointPairs(points);
  // console.log(JSON.stringify(pairs, null, 2));
  const centerPoint: MultiPoint = { points };
  // Deduplicate lines by slope; there can be only one line with
  // given slope that also passes through global center.
  const candidateLineSlopes = new Set<number>();
  pairs.forEach((pair) => {
    console.log();
    const crossLine: Line = {
      p1: pair.points[0],
      p2: pair.points[1],
    };
    console.log('cross line:', crossLine);
    if (isPointOnLine(centerPoint, crossLine)) {
      const slope = findLineSlope(crossLine);
      if (!candidateLineSlopes.has(slope)) {
        candidateLines.push(crossLine);
        candidateLineSlopes.add(slope);
      }
    }
    // midpoint on crossLine is also point on normalLine
    const midpoint: Point = {
      x: (crossLine.p1.x + crossLine.p2.x) / 2,
      y: (crossLine.p1.y + crossLine.p2.y) / 2,
    };
    const normalLine: Line = createNormalLine(crossLine, midpoint);
    console.log('normal line:', normalLine)
    if (isPointOnLine(centerPoint, normalLine)) {
      const slope = findLineSlope(normalLine);
      if (!candidateLineSlopes.has(slope)) {
        candidateLines.push(normalLine);
        candidateLineSlopes.add(slope);
      }
    }
  });
  console.log('candidate slopes', candidateLineSlopes);
  return candidateLines;
}

function doesLineReflectAllPoints(line: Line, points: Point[]): boolean {
  // O(N^2)
  return points.every((point) => {
    const reflectedPoint = reflectPointAcrossLine(point, line);
    return Boolean(points.find((otherPoint) => {
      return (
        Math.abs(reflectedPoint.x - otherPoint.x) === 0 && // epsilon?
        Math.abs(reflectedPoint.y - otherPoint.y) === 0 // epsilon?
      );
    }));
  });
}

// Return list of point pairs, unrepeated.
function findPointPairs(points: Point[]): MultiPoint[] {
  // N choose 2
  const pairs: MultiPoint[] = [];
  for (let p = 0; p < points.length - 1; p++) {
    for (let q = p + 1; q < points.length; q++) {
      const pair = {
        points: [
          points[p],
          points[q],
        ],
      };
      pairs.push(pair);
    }
  }
  return pairs;
}

function isPointOnLine(point: MultiPoint, line: Line): boolean {
  // average point
  const px = point.points.reduce((sum, point) => sum + point.x, 0);
  const py = point.points.reduce((sum, point) => sum + point.x, 0);
  const p: Point = {
    x: px,
    y: py,
  };
  let isPointOnLine: boolean;
  if (isLineHorizontal(line)) {
    isPointOnLine = p.y === line.p1.y;
  } else if (isLineVertical(line)) {
    isPointOnLine = p.x === line.p1.x;
  } else if (line.p1.x === p.x) { // check if p is p1
    isPointOnLine = line.p1.y === p.y;
  } else if (line.p2.x === p.x) { // check if p is p2
    isPointOnLine = line.p2.y === p.y;
  } else {
    const diff = (line.p1.y - p.y) / (line.p1.x - p.x) - (line.p2.y - p.y) / (line.p2.x - p.x);
    isPointOnLine = diff === 0; // epsilon?
  }
  console.log('isPointOnLine?', isPointOnLine, point, line);
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
    const c1 = (line.p1.x - line.p2.x) / (line.p2.y - line.p1.y);
    // 0th order polynomial coefficient, b'
    const c0 = point.y - c1 * point.x;
    otherPoint = {
      x: point.x + 1,
      y: c1 * (point.x + 1) + c0,
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
    // Intersect lines. Lines are guaranteed to intersect because they're normal.
    // Solve for x, y:
    //   y = ax + b
    //   y = a'x + b'
    //   ---
    //   x = (b' - b) / (a - a')
    //   y = a * (b' - b) / (a - a') + b
    const lineC1 = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
    const lineC0 = line.p2.y - lineC1 * line.p2.x;
    const normalC1 = (normal.p2.y - normal.p1.y) / (normal.p2.x - normal.p1.x);
    const normalC0 = normal.p2.y - normalC1 * normal.p2.x;
    intersectionPoint = {
      x: (normalC0 - lineC0) / (lineC1 - normalC1),
      y: lineC1 * (normalC0 - lineC0) / (lineC1 - normalC1) + lineC0,
    };
  }
  return intersectionPoint;
}

function isLineHorizontal(line: Line): boolean {
  return line.p1.y === line.p2.y;
}

function isLineVertical(line: Line): boolean {
  return line.p1.x === line.p2.x;
}

// Returns a number or Infinity (and never negative Infinity).
function findLineSlope(line: Line): number {
  // Solve line 1 for a, b given two points P1, P2:
  //   y = ax + b
  //   a = (P2.y - P1.y) / (P2.x - P1.x)
  //   b = P2.y - a * P2.x
  const slope = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
  if (isFinite(slope)) {
    return slope;
  }
  return Infinity;
}

interface Point {
  x: number;
  y: number;
}

interface Line {
  p1: Point;
  p2: Point;
}

interface MultiPoint {
  points: Point[];
}
