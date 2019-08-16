import { Point, Line } from './interfaces';

export function projectPointOntoLine(point: Point, line: Line): Point {
  // Compute point P' by projecting point P onto line L which passes through origin:
  // P' = (L L^T / L^T L) P
  // where:
  // L is the vector representing the line
  // L^T is L transposed
  // P is the vector representing the point
  //
  //         ⎡ (L.x)(L.x)  (L.x)(L.y) ⎤
  // L L^T = ⎢                        ⎥
  //         ⎣ (L.y)(L.x)  (L.y)(L.y) ⎦
  //
  // L^T L = (L.x)(L.x) + (L.y)(L.y)
  //
  // P'.x = [(P.x)(L.x)(L.x) + (P.y)(L.x)(L.y)] / [(L.x)(L.x) + (L.y)(L.y)]
  // P'.y = [(P.x)(L.y)(L.x) + (P.y)(L.y)(L.y)] / [(L.x)(L.x) + (L.y)(L.y)]
  const shift: Point = {
    x: line.p1.x,
    y: line.p1.y,
  };
  // Line represented by a vector (Point)
  const L: Point = {
    x: line.p2.x - shift.x,
    y: line.p2.y - shift.y,
  };
  const P: Point = {
    x: point.x - shift.x,
    y: point.y - shift.y,
  };
  const denom = L.x**2 + L.y**2
  const projected = {
    x: (P.x * L.x * L.x + P.y * L.x * L.y) / denom,
    y: (P.x * L.y * L.x + P.y * L.y * L.y) / denom,
  };

  // unshift projected point
  const unshiftedPoint: Point = {
    x: projected.x + shift.x,
    y: projected.y + shift.y,
  };

  return unshiftedPoint;
}

// Run playground when running this file directly.
if (require.main === module) {
  playground();
}

function playground() {
  const data: {point: Point, line: Line}[] = [
    {
      point: {x: 1, y: 1},
      line: {
        p1: {x: 0, y: 0},
        p2: {x: 1, y: 1},
      }
    },
    {
      point: {x: 0, y: 2},
      line: {
        p1: {x: 0, y: 0},
        p2: {x: 1, y: 1},
      }
    },
    {
      point: {x: 0, y: 1},
      line: {
        p1: {x: 0, y: 0},
        p2: {x: 1, y: 1},
      }
    },
    {
      point: {x: 0, y: 0},
      line: {
        p1: {x: 0, y: -1},
        p2: {x: 1, y: 0},
      }
    },
    // horizontal line
    {
      point: {x: 0, y: 0},
      line: {
        p1: {x: -10, y: 1},
        p2: {x: 10, y: 1},
      }
    },
    // vertical line
    {
      point: {x: 0, y: 0},
      line: {
        p1: {x: 1, y: 100},
        p2: {x: 1, y: -100},
      }
    },
    {
      point: {x: 0, y: 0},
      line: {
        p1: {x: -1, y: 0},
        p2: {x: 0, y: -2},
      }
    },
  ];

  data.forEach((d) => {
    console.log('------------------------');
    const projected = projectPointOntoLine(d.point, d.line);
    console.log('Projecting point');
    console.table(d.point);
    console.log('onto line');
    console.table(d.line);
    console.log('yields');
    console.table(projected);
  });
}
