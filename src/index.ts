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
  console.log(JSON.stringify(pairs, null, 2));
  return [];
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
