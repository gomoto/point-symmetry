import { findSymmetryLines } from './find-symmetry-lines';
import { strict as assert } from 'assert';
import { Point } from './find-symmetry-lines';

main();

function main(): void {

  // 2 points

  testSymmetry('Two points', 2, [
    {x: 0, y: 0},
    {x: 1, y: 0},
  ]);


  // 3 points

  testSymmetry('Three points in a line, evenly spaced', 2, [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
  ]);

  testSymmetry('Three points in a line, unevenly spaced', 1, [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 10, y: 0},
  ]);

  testSymmetry('Scalene triangle', 0, [
    {x: 0, y: 0},
    {x: 1, y: 1},
    {x: 3, y: 0},
  ]);

  testSymmetry('Isosceles triangle', 1, [
    {x: -1, y: 0},
    {x: 0, y: 3},
    {x: 1, y: 0},
  ]);

  testSymmetry('Equilateral triangle', 3, [
    {x: -1, y: 0},
    {x: 0, y: Math.sqrt(3)},
    {x: 1, y: 0},
  ]);

  // 4 points

  testSymmetry('Four points in a line, evenly spaced', 2, [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
  ]);

  testSymmetry('Four points in a line, unevenly spaced', 1, [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 10, y: 0},
  ]);

  testSymmetry('Square', 4, [
    {x: -1, y: -1},
    {x: 1, y: -1},
    {x: -1, y: 1},
    {x: 1, y: 1},
  ]);

  testSymmetry('Four points, equilateral triange plus center point', 3, [
    {x: -1, y: 0},
    {x: 0, y: Math.sqrt(3)},
    {x: 1, y: 0},
    {x: 0, y: Math.sqrt(3) / 3},
  ]);

  testSymmetry('Rectangle', 2, [
    {x: -3, y: -1},
    {x: 3, y: -1},
    {x: -3, y: 1},
    {x: 3, y: 1},
  ]);

  testSymmetry('Rhombus', 2, [
    {x: 0, y: 1},
    {x: 0, y: -1},
    {x: 2, y: 0},
    {x: -2, y: 0},
  ]);

  testSymmetry('Kite', 1, [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -4},
  ]);

  testSymmetry('Isosceles trapezoid', 1, [
    {x: -2, y: 0},
    {x: -1, y: 1},
    {x: 1, y: 1},
    {x: 2, y: 0},
  ]);

  testSymmetry('Trapezoid', 0, [
    {x: -2, y: 0},
    {x: -1, y: 1},
    {x: 1, y: 1},
    {x: 3, y: 0},
  ]);

  testSymmetry('Parallelogram', 0, [
    {x: -2, y: 0},
    {x: -1, y: 1},
    {x: 1, y: 0},
    {x: 2, y: 1},
  ]);

  // 5 points

  testSymmetry('Five points in a line, evenly spaced', 2, [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
  ]);

  testSymmetry('Five points in a line, unevenly spaced', 1, [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 10, y: 0},
  ]);

  testSymmetry('Five points, barn', 1, [
    {x: -1, y: 0},
    {x: -1, y: 2},
    {x: 0, y: 3},
    {x: 1, y: 0},
    {x: 1, y: 2},
  ]);

  testSymmetry('Five points, kite', 1, [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -4},
    {x: 0, y: -5},
  ]);

  testSymmetry('Five points, rectangle plus center point', 2, [
    {x: 2, y: 1},
    {x: 2, y: -1},
    {x: 0, y: 0},
    {x: -2, y: 1},
    {x: -2, y: -1},
  ]);

  testSymmetry('Five points, square plus center point', 4, [
    {x: -1, y: -1},
    {x: 1, y: -1},
    {x: -1, y: 1},
    {x: 1, y: 1},
    {x: 0, y: 0},
  ]);

  const c1 = Math.cos(2 * Math.PI / 5);
  const c2 = Math.cos(Math.PI / 5);
  const s1 = Math.sin(2 * Math.PI / 5);
  const s2 = Math.sin(4 * Math.PI / 5);
  testSymmetry('Five points, regular pentagon', 5, [
    {x: 1, y: 0},
    {x: c1, y: -s1},
    {x: c1, y: s1},
    {x: -c2, y: -s2},
    {x: -c2, y: s2},
  ]);

  // 6 points

  testSymmetry('Six points in a line, evenly spaced', 2, [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
  ]);

  testSymmetry('Six points in a line, unevenly spaced', 1, [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
    {x: 10, y: 0},
  ]);

  testSymmetry('Six points, irregular', 0, [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
    {x: 5, y: 0},
  ]);

  testSymmetry('Six points, rotated nested equilateral triangles', 0, [
    {x: -1, y: 0},
    {x: 0, y: Math.sqrt(3)},
    {x: 1, y: 0},
    {x: -3, y: 0},
    {x: 1, y: 2 * Math.sqrt(3)},
    {x: 2, y: - Math.sqrt(3)},
  ]);

  testSymmetry('Six points, kite', 1, [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -4},
    {x: 0, y: -5},
    {x: 0, y: -6},
  ]);

  testSymmetry('Six points, elongated hexagon', 2, [
    {x: 2, y: 0},
    {x: 3, y: Math.sqrt(3)},
    {x: -3, y: Math.sqrt(3)},
    {x: -2, y: 0},
    {x: -3, y: -Math.sqrt(3)},
    {x: 3, y: -Math.sqrt(3)},
  ]);

  testSymmetry('Six points, nested equilateral triangles', 3, [
    {x: -1, y: 0},
    {x: 0, y: Math.sqrt(3)},
    {x: 1, y: 0},
    {x: -2, y: -Math.sqrt(3) / 3},
    {x: 0, y: 5 * Math.sqrt(3) / 3},
    {x: 2, y: -Math.sqrt(3) / 3},
  ]);

  testSymmetry('Six points, regular pentagon plus center point', 5, [
    {x: 1, y: 0},
    {x: c1, y: -s1},
    {x: c1, y: s1},
    {x: -c2, y: -s2},
    {x: -c2, y: s2},
    {x: 0, y: 0},
  ]);

  testSymmetry('Six points, regular hexagon', 6, [
    {x: 2, y: 0},
    {x: 1, y: Math.sqrt(3)},
    {x: -1, y: Math.sqrt(3)},
    {x: -2, y: 0},
    {x: -1, y: -Math.sqrt(3)},
    {x: 1, y: -Math.sqrt(3)},
  ]);
}

function testSymmetry(message: string, expectedLineCount: number, points: Point[]): void {
  console.log(message);

  // Find lines of symmetry for given points.
  const lines = findSymmetryLines(points);
  console.table(lines);
  assert.equal(lines.length, expectedLineCount);

  // Rotate all points about origin by 90 degrees.
  // The number of symmetry lines should be the same.
  const rotatedPoints1 = rotatePoints(points, Math.PI / 2);
  const rotatedLines1 = findSymmetryLines(rotatedPoints1);
  console.table(rotatedLines1);
  assert.equal(rotatedLines1.length, expectedLineCount);

  // Rotate all points about origin for some angle.
  // The number of symmetry lines should be the same.
  const rotatedPoints2 = rotatePoints(points, 1);
  const rotatedLines2 = findSymmetryLines(rotatedPoints2);
  console.table(rotatedLines2);
  assert.equal(rotatedLines2.length, expectedLineCount);
}

function rotatePoints(points: Point[], radians: number): Point[] {
  // ⎡ cosθ -sinθ ⎤  ⎡ x ⎤   ⎡ xcosθ - ysinθ ⎤
  // ⎢            ⎥  ⎢   ⎥ = ⎢               ⎥
  // ⎣ sinθ  cosθ ⎦  ⎣ y ⎦   ⎣ xsinθ + ycosθ ⎦
  const pointsOut = points.map((point) => {
    const pointOut: Point = {
      x: point.x * Math.cos(radians) - point.y * Math.sin(radians),
      y: point.x * Math.sin(radians) + point.y * Math.cos(radians),
    };
    return pointOut;
  });
  return pointsOut;
}
