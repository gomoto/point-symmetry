import { Point } from './interfaces';

export function rotatePoint(point: Point, radians: number): Point {
  // Rotate point around origin (0, 0).
  // ⎡ cosθ -sinθ ⎤  ⎡ x ⎤   ⎡ xcosθ - ysinθ ⎤
  // ⎢            ⎥  ⎢   ⎥ = ⎢               ⎥
  // ⎣ sinθ  cosθ ⎦  ⎣ y ⎦   ⎣ xsinθ + ycosθ ⎦
  const rotatedPoint: Point = {
    x: point.x * Math.cos(radians) - point.y * Math.sin(radians),
    y: point.x * Math.sin(radians) + point.y * Math.cos(radians),
  };
  return rotatedPoint;
}
