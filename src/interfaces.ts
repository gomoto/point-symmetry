export interface Point {
  x: number;
  y: number;
}

export interface Line {
  // A line is defined by two points, which should not be the same.
  p1: Point;
  p2: Point;
}
