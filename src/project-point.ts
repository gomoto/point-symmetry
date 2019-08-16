import { Point, Line } from './interfaces';

export function projectPointOntoLine(point: Point, line: Line): Point {
  // For line L passing through origin, compute projected P' using:
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
