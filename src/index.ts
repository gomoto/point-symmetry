import { findSymmetryLines } from './find-symmetry-lines';
import { strict as assert } from 'assert';
import { Point } from './find-symmetry-lines';

main();

function main(): void {

  // 2 points

  logAndCountSymmetryLines('Two points:', [
    {x: 0, y: 0},
    {x: 1, y: 0},
  ], 2);


  // 3 points

  logAndCountSymmetryLines('Three points in a line, evenly spaced', [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
  ], 2);

  logAndCountSymmetryLines('Three points in a line, unevenly spaced', [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 10, y: 0},
  ], 1);

  logAndCountSymmetryLines('Scalene triangle', [
    {x: 0, y: 0},
    {x: 1, y: 1},
    {x: 3, y: 0},
  ], 0);

  logAndCountSymmetryLines('Isosceles triangle', [
    {x: -1, y: 0},
    {x: 0, y: 3},
    {x: 1, y: 0},
  ], 1);

  logAndCountSymmetryLines('Equilateral triangle', [
    {x: -1, y: 0},
    {x: 0, y: Math.sqrt(3)},
    {x: 1, y: 0},
  ], 3);

  // 4 points

  logAndCountSymmetryLines('Four points in a line, evenly spaced', [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
  ], 2);

  logAndCountSymmetryLines('Four points in a line, unevenly spaced', [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 10, y: 0},
  ], 1);

  logAndCountSymmetryLines('Square', [
    {x: -1, y: -1},
    {x: 1, y: -1},
    {x: -1, y: 1},
    {x: 1, y: 1},
  ], 4);

  logAndCountSymmetryLines('Four points, equilateral triange plus center point', [
    {x: -1, y: 0},
    {x: 0, y: Math.sqrt(3)},
    {x: 1, y: 0},
    {x: 0, y: Math.sqrt(3) / 3},
  ], 3);

  logAndCountSymmetryLines('Rectangle', [
    {x: -3, y: -1},
    {x: 3, y: -1},
    {x: -3, y: 1},
    {x: 3, y: 1},
  ], 2);

  logAndCountSymmetryLines('Rhombus', [
    {x: 0, y: 1},
    {x: 0, y: -1},
    {x: 2, y: 0},
    {x: -2, y: 0},
  ], 2);

  logAndCountSymmetryLines('Kite', [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -4},
  ], 1);

  logAndCountSymmetryLines('Isosceles trapezoid', [
    {x: -2, y: 0},
    {x: -1, y: 1},
    {x: 1, y: 1},
    {x: 2, y: 0},
  ], 1);

  logAndCountSymmetryLines('Trapezoid', [
    {x: -2, y: 0},
    {x: -1, y: 1},
    {x: 1, y: 1},
    {x: 3, y: 0},
  ], 0);

  logAndCountSymmetryLines('Parallelogram', [
    {x: -2, y: 0},
    {x: -1, y: 1},
    {x: 1, y: 0},
    {x: 2, y: 1},
  ], 0);

  // 5 points

  logAndCountSymmetryLines('Five points in a line, evenly spaced', [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
  ], 2);

  logAndCountSymmetryLines('Five points in a line, unevenly spaced', [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 10, y: 0},
  ], 1);

  logAndCountSymmetryLines('Five points, barn', [
    {x: -1, y: 0},
    {x: -1, y: 2},
    {x: 0, y: 3},
    {x: 1, y: 0},
    {x: 1, y: 2},
  ], 1);

  logAndCountSymmetryLines('Five points, kite', [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -4},
    {x: 0, y: -5},
  ], 1);

  logAndCountSymmetryLines('Five points, rectangle plus center point', [
    {x: 2, y: 1},
    {x: 2, y: -1},
    {x: 0, y: 0},
    {x: -2, y: 1},
    {x: -2, y: -1},
  ], 2);

  logAndCountSymmetryLines('Five points, square plus center point', [
    {x: -1, y: -1},
    {x: 1, y: -1},
    {x: -1, y: 1},
    {x: 1, y: 1},
    {x: 0, y: 0},
  ], 4);

  const c1 = Math.cos(2 * Math.PI / 5);
  const c2 = Math.cos(Math.PI / 5);
  const s1 = Math.sin(2 * Math.PI / 5);
  const s2 = Math.sin(4 * Math.PI / 5);
  logAndCountSymmetryLines('Five points, regular pentagon', [
    {x: 1, y: 0},
    {x: c1, y: -s1},
    {x: c1, y: s1},
    {x: -c2, y: -s2},
    {x: -c2, y: s2},
  ], 5);

  // 6 points

  logAndCountSymmetryLines('Six points in a line, evenly spaced', [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
  ], 2);

  logAndCountSymmetryLines('Six points in a line, unevenly spaced', [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
    {x: 10, y: 0},
  ], 1);

  logAndCountSymmetryLines('Six points, irregular', [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
    {x: 5, y: 0},
  ], 0);

  logAndCountSymmetryLines('Six points, kite', [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -4},
    {x: 0, y: -5},
    {x: 0, y: -6},
  ], 1);

  logAndCountSymmetryLines('Six points, elongated hexagon', [
    {x: 2, y: 0},
    {x: 3, y: Math.sqrt(3)},
    {x: -3, y: Math.sqrt(3)},
    {x: -2, y: 0},
    {x: -3, y: -Math.sqrt(3)},
    {x: 3, y: -Math.sqrt(3)},
  ], 2);

  logAndCountSymmetryLines('Six points, nested equilateral triangles', [
    {x: -1, y: 0},
    {x: 0, y: Math.sqrt(3)},
    {x: 1, y: 0},
    {x: -2, y: -Math.sqrt(3) / 3},
    {x: 0, y: 5 * Math.sqrt(3) / 3},
    {x: 2, y: -Math.sqrt(3) / 3},
  ], 3);

  logAndCountSymmetryLines('Six points, regular pentagon plus center point', [
    {x: 1, y: 0},
    {x: c1, y: -s1},
    {x: c1, y: s1},
    {x: -c2, y: -s2},
    {x: -c2, y: s2},
    {x: 0, y: 0},
  ], 5);

  logAndCountSymmetryLines('Six points, regular hexagon', [
    {x: 2, y: 0},
    {x: 1, y: Math.sqrt(3)},
    {x: -1, y: Math.sqrt(3)},
    {x: -2, y: 0},
    {x: -1, y: -Math.sqrt(3)},
    {x: 1, y: -Math.sqrt(3)},
  ], 6);
}

function logAndCountSymmetryLines(message: string, points: Point[], expectedLineCount: number): void {
  console.log(message);
  const lines = findSymmetryLines(points);
  console.table(lines);
  assert.equal(lines.length, expectedLineCount);
}
