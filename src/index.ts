import { findSymmetryLines } from './find-symmetry-lines';
import { strict as assert } from 'assert';
import { Point } from './find-symmetry-lines';

main();

function main(): void {

  // 2 points

  console.log('Two points:');
  logAndCountSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
  ], 2);


  // 3 points

  console.log('Three points in a line, evenly spaced');
  logAndCountSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
  ], 2);

  console.log('Three points in a line, unevenly spaced');
  logAndCountSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 10, y: 0},
  ], 1);

  console.log('Scalene triangle');
  logAndCountSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 1},
    {x: 3, y: 0},
  ], 0);

  console.log('Isosceles triangle');
  logAndCountSymmetryLines([
    {x: -1, y: 0},
    {x: 0, y: 3},
    {x: 1, y: 0},
  ], 1);

  console.log('Equilateral triangle');
  logAndCountSymmetryLines([
    {x: -1, y: 0},
    {x: 0, y: Math.sqrt(3)},
    {x: 1, y: 0},
  ], 3);

  // 4 points

  console.log('Four points in a line, evenly spaced');
  logAndCountSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
  ], 2);

  console.log('Four points in a line, unevenly spaced');
  logAndCountSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 10, y: 0},
  ], 1);

  console.log('Square');
  logAndCountSymmetryLines([
    {x: -1, y: -1},
    {x: 1, y: -1},
    {x: -1, y: 1},
    {x: 1, y: 1},
  ], 4);

  console.log('Four points, equilateral triange plus center point');
  logAndCountSymmetryLines([
    {x: -1, y: 0},
    {x: 0, y: Math.sqrt(3)},
    {x: 1, y: 0},
    {x: 0, y: Math.sqrt(3) / 3},
  ], 3);

  console.log('Rectangle');
  logAndCountSymmetryLines([
    {x: -3, y: -1},
    {x: 3, y: -1},
    {x: -3, y: 1},
    {x: 3, y: 1},
  ], 2);

  console.log('Rhombus');
  logAndCountSymmetryLines([
    {x: 0, y: 1},
    {x: 0, y: -1},
    {x: 2, y: 0},
    {x: -2, y: 0},
  ], 2);

  console.log('Kite');
  logAndCountSymmetryLines([
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -4},
  ], 1);

  console.log('Isosceles trapezoid');
  logAndCountSymmetryLines([
    {x: -2, y: 0},
    {x: -1, y: 1},
    {x: 1, y: 1},
    {x: 2, y: 0},
  ], 1);

  console.log('Trapezoid');
  logAndCountSymmetryLines([
    {x: -2, y: 0},
    {x: -1, y: 1},
    {x: 1, y: 1},
    {x: 3, y: 0},
  ], 0);

  console.log('Parallelogram');
  logAndCountSymmetryLines([
    {x: -2, y: 0},
    {x: -1, y: 1},
    {x: 1, y: 0},
    {x: 2, y: 1},
  ], 0);

  // 5 points

  console.log('Five points in a line, evenly spaced');
  logAndCountSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
  ], 2);

  console.log('Five points in a line, unevenly spaced');
  logAndCountSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 10, y: 0},
  ], 1);

  console.log('Five points, barn');
  logAndCountSymmetryLines([
    {x: -1, y: 0},
    {x: -1, y: 2},
    {x: 0, y: 3},
    {x: 1, y: 0},
    {x: 1, y: 2},
  ], 1);

  console.log('Five points, kite');
  logAndCountSymmetryLines([
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -4},
    {x: 0, y: -5},
  ], 1);

  console.log('Five points, rectangle plus center point');
  logAndCountSymmetryLines([
    {x: 2, y: 1},
    {x: 2, y: -1},
    {x: 0, y: 0},
    {x: -2, y: 1},
    {x: -2, y: -1},
  ], 2);

  console.log('Five points, square plus center point');
  logAndCountSymmetryLines([
    {x: -1, y: -1},
    {x: 1, y: -1},
    {x: -1, y: 1},
    {x: 1, y: 1},
    {x: 0, y: 0},
  ], 4);

  console.log('Five points, regular pentagon');
  const c1 = Math.cos(2 * Math.PI / 5);
  const c2 = Math.cos(Math.PI / 5);
  const s1 = Math.sin(2 * Math.PI / 5);
  const s2 = Math.sin(4 * Math.PI / 5);
  logAndCountSymmetryLines([
    {x: 1, y: 0},
    {x: c1, y: -s1},
    {x: c1, y: s1},
    {x: -c2, y: -s2},
    {x: -c2, y: s2},
  ], 5);

  // 6 points

  console.log('Six points in a line, evenly spaced');
  logAndCountSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
  ], 2);

  console.log('Six points in a line, unevenly spaced');
  logAndCountSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
    {x: 10, y: 0},
  ], 1);

  console.log('Six points, irregular');
  logAndCountSymmetryLines([
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
    {x: 5, y: 0},
  ], 0);

  console.log('Six points, kite');
  logAndCountSymmetryLines([
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -4},
    {x: 0, y: -5},
    {x: 0, y: -6},
  ], 1);

  console.log('Six points, elongated hexagon');
  logAndCountSymmetryLines([
    {x: 2, y: 0},
    {x: 3, y: Math.sqrt(3)},
    {x: -3, y: Math.sqrt(3)},
    {x: -2, y: 0},
    {x: -3, y: -Math.sqrt(3)},
    {x: 3, y: -Math.sqrt(3)},
  ], 2);

  console.log('Six points, nested equilateral triangles');
  logAndCountSymmetryLines([
    {x: -1, y: 0},
    {x: 0, y: Math.sqrt(3)},
    {x: 1, y: 0},
    {x: -2, y: -Math.sqrt(3) / 3},
    {x: 0, y: 5 * Math.sqrt(3) / 3},
    {x: 2, y: -Math.sqrt(3) / 3},
  ], 3);

  console.log('Six points, regular pentagon plus center point');
  logAndCountSymmetryLines([
    {x: 1, y: 0},
    {x: c1, y: -s1},
    {x: c1, y: s1},
    {x: -c2, y: -s2},
    {x: -c2, y: s2},
    {x: 0, y: 0},
  ], 5);

  console.log('Six points, regular hexagon');
  logAndCountSymmetryLines([
    {x: 2, y: 0},
    {x: 1, y: Math.sqrt(3)},
    {x: -1, y: Math.sqrt(3)},
    {x: -2, y: 0},
    {x: -1, y: -Math.sqrt(3)},
    {x: 1, y: -Math.sqrt(3)},
  ], 6);
}

function logAndCountSymmetryLines(points: Point[], expectedLineCount: number): void {
  const lines = findSymmetryLines(points);
  console.table(lines);
  assert.equal(lines.length, expectedLineCount);
}
