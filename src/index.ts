main();

function main(): void {
  // square
  const points = [
    {x: -1, y: -1},
    {x: 1, y: -1},
    {x: -1, y: 1},
    {x: 1, y: 1},
  ];
  const symmetryLines = findAllSymmetryLines(points);
  console.table(symmetryLines);
}

function findAllSymmetryLines(points: Point[]): Line[] {
  const candidateLines = findCandidateSymmetryLines(points);
  console.log('candidateLines', candidateLines);
  const symmetryLines = candidateLines.filter((line) => doesLineReflectAllPoints(line, points));
  return symmetryLines;
}

function findCandidateSymmetryLines(points: Point[]): Line[] {
  const pairs: MultiPoint[] = findPointPairs(points);
  // console.log(JSON.stringify(pairs, null, 2));
  const centerPoint: MultiPoint = { points };
  const candidateLines: Line[] = [];
  pairs.forEach((pair) => {
    console.log();
    console.log('pair:', pair);
    const crossLine: Line = {
      p1: pair.points[0],
      p2: pair.points[1],
    };
    if (isPointOnLine(centerPoint, crossLine)) {
      candidateLines.push(crossLine);
    }
    // midpoint on crossLine is also point on normalLine
    const midpoint: Point = {
      x: (crossLine.p1.x + crossLine.p2.x) / 2,
      y: (crossLine.p1.y + crossLine.p2.y) / 2,
    };
    const normalLine: Line = createNormalLine(crossLine, midpoint);
    console.log('normal line:', normalLine)
    if (isPointOnLine(centerPoint, normalLine)) {
      candidateLines.push(normalLine);
    }
  });
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
  const diff = (line.p1.y - p.y) / (line.p1.x - p.x) - (line.p2.y - p.y) / (line.p2.x - p.x);
  const isPointOnLine = diff === 0; // epsilon?
  // console.log(isPointOnLine);
  return isPointOnLine;
}

// Create line perpendicular to given line that passes through given point.
function createNormalLine(line: Line, point: Point): Line {
  // other point on normal line should be different from given point
  let otherPoint: Point;
  if (line.p1.y === line.p2.y) { // line is horizontal
    otherPoint = {
      x: point.x,
      y: point.y + 1,
    };
  } else if (line.p1.x === line.p2.x) { // line is vertical
    otherPoint = {
      x: point.x + 1,
      y: point.y,
    };
  } else {
    // 1st order polynomial coefficient (negative reciprocal of 1st order coefficient of original line)
    const c1 = (line.p1.x - line.p2.x) / (line.p2.y - line.p1.y);
    // 0th order polynomial coefficient
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
  if (line.p1.y === line.p2.y) { // line is horizontal
    intersectionPoint = {
      x: point.x,
      y: line.p1.y,
    };
  } else if (line.p1.x === line.p2.x) { // line is vertical
    intersectionPoint = {
      x: line.p1.x,
      y: point.y,
    };
  } else {
    const normal = createNormalLine(line, point);
    // intersect lines. lines are guaranteed to intersect because they're normal
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
