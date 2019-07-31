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
    const crossLine: Line = {
      a: pair.points[0],
      b: pair.points[1],
    };
    if (isPointOnLine(centerPoint, crossLine)) {
      candidateLines.push(crossLine);
    }
    const throughLine: Line = createNormalLine(crossLine);
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
  const isPointOnLine = diff === 0;
  // console.log(isPointOnLine);
  return isPointOnLine;
}

function createNormalLine(line: Line): Line {
  return line;
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
