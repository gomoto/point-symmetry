import { findSymmetryLines } from './find-symmetry-lines';
import { strict as assert } from 'assert';
import { Point } from './find-symmetry-lines';

main();

function main(): void {

  // 2 points

  logAndCountSymmetryLines('Two points:', 2, [
    {x: 0, y: 0},
    {x: 1, y: 0},
  ]);


  // 3 points

  logAndCountSymmetryLines('Three points in a line, evenly spaced', 2, [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
  ]);

  logAndCountSymmetryLines('Three points in a line, unevenly spaced', 1, [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 10, y: 0},
  ]);

  logAndCountSymmetryLines('Scalene triangle', 0, [
    {x: 0, y: 0},
    {x: 1, y: 1},
    {x: 3, y: 0},
  ]);

  logAndCountSymmetryLines('Isosceles triangle', 1, [
    {x: -1, y: 0},
    {x: 0, y: 3},
    {x: 1, y: 0},
  ]);

  logAndCountSymmetryLines('Equilateral triangle', 3, [
    {x: -1, y: 0},
    {x: 0, y: Math.sqrt(3)},
    {x: 1, y: 0},
  ]);

  // 4 points

  logAndCountSymmetryLines('Four points in a line, evenly spaced', 2, [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
  ]);

  logAndCountSymmetryLines('Four points in a line, unevenly spaced', 1, [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 10, y: 0},
  ]);

  logAndCountSymmetryLines('Square', 4, [
    {x: -1, y: -1},
    {x: 1, y: -1},
    {x: -1, y: 1},
    {x: 1, y: 1},
  ]);

  logAndCountSymmetryLines('Four points, equilateral triange plus center point', 3, [
    {x: -1, y: 0},
    {x: 0, y: Math.sqrt(3)},
    {x: 1, y: 0},
    {x: 0, y: Math.sqrt(3) / 3},
  ]);

  logAndCountSymmetryLines('Rectangle', 2, [
    {x: -3, y: -1},
    {x: 3, y: -1},
    {x: -3, y: 1},
    {x: 3, y: 1},
  ]);

  logAndCountSymmetryLines('Rhombus', 2, [
    {x: 0, y: 1},
    {x: 0, y: -1},
    {x: 2, y: 0},
    {x: -2, y: 0},
  ]);

  logAndCountSymmetryLines('Kite', 1, [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -4},
  ]);

  logAndCountSymmetryLines('Isosceles trapezoid', 1, [
    {x: -2, y: 0},
    {x: -1, y: 1},
    {x: 1, y: 1},
    {x: 2, y: 0},
  ]);

  logAndCountSymmetryLines('Trapezoid', 0, [
    {x: -2, y: 0},
    {x: -1, y: 1},
    {x: 1, y: 1},
    {x: 3, y: 0},
  ]);

  logAndCountSymmetryLines('Parallelogram', 0, [
    {x: -2, y: 0},
    {x: -1, y: 1},
    {x: 1, y: 0},
    {x: 2, y: 1},
  ]);

  // 5 points

  logAndCountSymmetryLines('Five points in a line, evenly spaced', 2, [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
  ]);

  logAndCountSymmetryLines('Five points in a line, unevenly spaced', 1, [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 10, y: 0},
  ]);

  logAndCountSymmetryLines('Five points, barn', 1, [
    {x: -1, y: 0},
    {x: -1, y: 2},
    {x: 0, y: 3},
    {x: 1, y: 0},
    {x: 1, y: 2},
  ]);

  logAndCountSymmetryLines('Five points, kite', 1, [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -4},
    {x: 0, y: -5},
  ]);

  logAndCountSymmetryLines('Five points, rectangle plus center point', 2, [
    {x: 2, y: 1},
    {x: 2, y: -1},
    {x: 0, y: 0},
    {x: -2, y: 1},
    {x: -2, y: -1},
  ]);

  logAndCountSymmetryLines('Five points, square plus center point', 4, [
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
  logAndCountSymmetryLines('Five points, regular pentagon', 5, [
    {x: 1, y: 0},
    {x: c1, y: -s1},
    {x: c1, y: s1},
    {x: -c2, y: -s2},
    {x: -c2, y: s2},
  ]);

  // 6 points

  logAndCountSymmetryLines('Six points in a line, evenly spaced', 2, [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
  ]);

  logAndCountSymmetryLines('Six points in a line, unevenly spaced', 1, [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
    {x: 10, y: 0},
  ]);

  logAndCountSymmetryLines('Six points, irregular', 0, [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
    {x: 5, y: 0},
  ]);

  logAndCountSymmetryLines('Six points, kite', 1, [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -4},
    {x: 0, y: -5},
    {x: 0, y: -6},
  ]);

  logAndCountSymmetryLines('Six points, elongated hexagon', 2, [
    {x: 2, y: 0},
    {x: 3, y: Math.sqrt(3)},
    {x: -3, y: Math.sqrt(3)},
    {x: -2, y: 0},
    {x: -3, y: -Math.sqrt(3)},
    {x: 3, y: -Math.sqrt(3)},
  ]);

  logAndCountSymmetryLines('Six points, nested equilateral triangles', 3, [
    {x: -1, y: 0},
    {x: 0, y: Math.sqrt(3)},
    {x: 1, y: 0},
    {x: -2, y: -Math.sqrt(3) / 3},
    {x: 0, y: 5 * Math.sqrt(3) / 3},
    {x: 2, y: -Math.sqrt(3) / 3},
  ]);

  logAndCountSymmetryLines('Six points, regular pentagon plus center point', 5, [
    {x: 1, y: 0},
    {x: c1, y: -s1},
    {x: c1, y: s1},
    {x: -c2, y: -s2},
    {x: -c2, y: s2},
    {x: 0, y: 0},
  ]);

  logAndCountSymmetryLines('Six points, regular hexagon', 6, [
    {x: 2, y: 0},
    {x: 1, y: Math.sqrt(3)},
    {x: -1, y: Math.sqrt(3)},
    {x: -2, y: 0},
    {x: -1, y: -Math.sqrt(3)},
    {x: 1, y: -Math.sqrt(3)},
  ]);
}

function logAndCountSymmetryLines(message: string, expectedLineCount: number, points: Point[]): void {
  console.log(message);
  const lines = findSymmetryLines(points);
  console.table(lines);
  assert.equal(lines.length, expectedLineCount);
}
