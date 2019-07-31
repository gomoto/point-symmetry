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
      a: pair.points[0],
      b: pair.points[1],
    };
    if (isPointOnLine(centerPoint, crossLine)) {
      candidateLines.push(crossLine);
    }
    const throughLine: Line = createNormalLine(crossLine);
    console.log('normal line:', throughLine)
    if (isPointOnLine(centerPoint, throughLine)) {
      candidateLines.push(throughLine);
    }
  });
  return candidateLines;
}
function doesLineReflectAllPoints(line: Line, points: Point[]): boolean {
  return true;
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
  const diff = (line.a.y - p.y) / (line.a.x - p.x) - (line.b.y - p.y) / (line.b.x - p.x);
  const isPointOnLine = diff === 0; // epsilon?
  // console.log(isPointOnLine);
  return isPointOnLine;
}

function createNormalLine(line: Line): Line {
  // midpoint on line is also point on normal line
  const midpoint: Point = {
    x: (line.a.x + line.b.x) / 2,
    y: (line.a.y + line.b.y) / 2,
  };
  // other point on normal line should be different from midpoint
  let otherPoint: Point;
  if (line.a.y === line.b.y) { // line is horizontal
    otherPoint = {
      x: midpoint.x,
      y: midpoint.y + 1,
    };
  } else if (line.a.x === line.b.x) { // line is vertical
    otherPoint = {
      x: midpoint.x + 1,
      y: midpoint.y,
    };
  } else {
    // 1st order polynomial coefficient (negative reciprocal of 1st order coefficient of original line)
    const c1 = (line.a.x - line.b.x) / (line.b.y - line.a.y);
    // 0th order polynomial coefficient
    const c0 = midpoint.y - c1 * midpoint.x;
    otherPoint = {
      x: midpoint.x + 1,
      y: c1 * (midpoint.x + 1) + c0,
    };
  }
  const normalLine: Line = {
    a: midpoint,
    b: otherPoint,
  };
  return normalLine;
}

interface Point {
  x: number;
  y: number;
}

interface Line {
  a: Point;
  b: Point;
}

interface MultiPoint {
  points: Point[];
}
