import { Point } from './interfaces';

// Rotate point around origin (0, 0).
export function rotatePoint(point: Point, radians: number): Point {
  // ⎡ cosθ -sinθ ⎤  ⎡ x ⎤   ⎡ xcosθ - ysinθ ⎤
  // ⎢            ⎥  ⎢   ⎥ = ⎢               ⎥
  // ⎣ sinθ  cosθ ⎦  ⎣ y ⎦   ⎣ xsinθ + ycosθ ⎦
  const rotatedPoint: Point = {
    x: point.x * Math.cos(radians) - point.y * Math.sin(radians),
    y: point.x * Math.sin(radians) + point.y * Math.cos(radians),
  };
  return rotatedPoint;
}
