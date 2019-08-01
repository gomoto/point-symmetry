import { findSymmetryLines } from './find-symmetry-lines';

main();

function main(): void {

  // 2 points

  console.log('Two points (2)');
  console.table(findSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
  ]));

  // 3 points

  console.log('Three points in a line, evenly spaced (2)');
  console.table(findSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
  ]));

  console.log('Three points in a line, unevenly spaced (1)');
  console.table(findSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 10, y: 0},
  ]));

  console.log('Scalene triangle (0)');
  console.table(findSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 1},
    {x: 3, y: 0},
  ]));

  console.log('Isosceles triangle (1)');
  console.table(findSymmetryLines([
    {x: -1, y: 0},
    {x: 0, y: 3},
    {x: 1, y: 0},
  ]));

  console.log('Equilateral triangle (3)');
  console.table(findSymmetryLines([
    {x: -1, y: 0},
    {x: 0, y: Math.sqrt(3)},
    {x: 1, y: 0},
  ]));

  // 4 points

  console.log('Four points in a line, evenly spaced (2)');
  console.table(findSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
  ]));

  console.log('Four points in a line, unevenly spaced (1)');
  console.table(findSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 10, y: 0},
  ]));

  console.log('Square (4)');
  console.table(findSymmetryLines([
    {x: -1, y: -1},
    {x: 1, y: -1},
    {x: -1, y: 1},
    {x: 1, y: 1},
  ]));

  console.log('Four points, equilateral triange plus center point (3)');
  console.table(findSymmetryLines([
    {x: -1, y: 0},
    {x: 0, y: Math.sqrt(3)},
    {x: 1, y: 0},
    {x: 0, y: Math.sqrt(3) / 3},
  ]));

  console.log('Rectangle (2)');
  console.table(findSymmetryLines([
    {x: -3, y: -1},
    {x: 3, y: -1},
    {x: -3, y: 1},
    {x: 3, y: 1},
  ]));

  console.log('Rhombus (2)');
  console.table(findSymmetryLines([
    {x: 0, y: 1},
    {x: 0, y: -1},
    {x: 2, y: 0},
    {x: -2, y: 0},
  ]));

  console.log('Kite (1)');
  console.table(findSymmetryLines([
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -4},
  ]));

  console.log('Isosceles trapezoid (1)');
  console.table(findSymmetryLines([
    {x: -2, y: 0},
    {x: -1, y: 1},
    {x: 1, y: 1},
    {x: 2, y: 0},
  ]));

  console.log('Trapezoid (0)');
  console.table(findSymmetryLines([
    {x: -2, y: 0},
    {x: -1, y: 1},
    {x: 1, y: 1},
    {x: 3, y: 0},
  ]));

  console.log('Parallelogram (0)');
  console.table(findSymmetryLines([
    {x: -2, y: 0},
    {x: -1, y: 1},
    {x: 1, y: 0},
    {x: 2, y: 1},
  ]));

  // 5 points

  console.log('Five points in a line, evenly spaced (2)');
  console.table(findSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
  ]));

  console.log('Five points in a line, unevenly spaced (1)');
  console.table(findSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 10, y: 0},
  ]));

  console.log('Five points, barn (1)');
  console.table(findSymmetryLines([
    {x: -1, y: 0},
    {x: -1, y: 2},
    {x: 0, y: 3},
    {x: 1, y: 0},
    {x: 1, y: 2},
  ]));

  console.log('Five points, kite (1)');
  console.table(findSymmetryLines([
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -4},
    {x: 0, y: -5},
  ]));

  console.log('Five points, rectangle plus center point (2)');
  console.table(findSymmetryLines([
    {x: 2, y: 1},
    {x: 2, y: -1},
    {x: 0, y: 0},
    {x: -2, y: 1},
    {x: -2, y: -1},
  ]));

  console.log('Five points, square plus center point (4)');
  console.table(findSymmetryLines([
    {x: -1, y: -1},
    {x: 1, y: -1},
    {x: -1, y: 1},
    {x: 1, y: 1},
    {x: 0, y: 0},
  ]));

  console.log('Five points, regular pentagon (5)');
  const c1 = Math.cos(2 * Math.PI / 5);
  const c2 = Math.cos(Math.PI / 5);
  const s1 = Math.sin(2 * Math.PI / 5);
  const s2 = Math.sin(4 * Math.PI / 5);
  console.table(findSymmetryLines([
    {x: 1, y: 0},
    {x: c1, y: -s1},
    {x: c1, y: s1},
    {x: -c2, y: -s2},
    {x: -c2, y: s2},
  ]));

  // 6 points

  console.log('Six points in a line, evenly spaced (2)');
  console.table(findSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
  ]));

  console.log('Six points in a line, unevenly spaced (1)');
  console.table(findSymmetryLines([
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
    {x: 10, y: 0},
  ]));

  console.log('Six points, irregular (0)');
  console.table(findSymmetryLines([
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
    {x: 5, y: 0},
  ]));

  console.log('Six points, kite (1)');
  console.table(findSymmetryLines([
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -4},
    {x: 0, y: -5},
    {x: 0, y: -6},
  ]));

  console.log('Six points, elongated hexagon (2)');
  console.table(findSymmetryLines([
    {x: 2, y: 0},
    {x: 3, y: Math.sqrt(3)},
    {x: -3, y: Math.sqrt(3)},
    {x: -2, y: 0},
    {x: -3, y: -Math.sqrt(3)},
    {x: 3, y: -Math.sqrt(3)},
  ]));

  console.log('Six points, nested equilateral triangles (3)');
  console.table(findSymmetryLines([
    {x: -1, y: 0},
    {x: 0, y: Math.sqrt(3)},
    {x: 1, y: 0},
    {x: -2, y: -Math.sqrt(3) / 3},
    {x: 0, y: 5 * Math.sqrt(3) / 3},
    {x: 2, y: -Math.sqrt(3) / 3},
  ]));

  console.log('Six points, regular pentagon plus center point (5)');
  console.table(findSymmetryLines([
    {x: 1, y: 0},
    {x: c1, y: -s1},
    {x: c1, y: s1},
    {x: -c2, y: -s2},
    {x: -c2, y: s2},
    {x: 0, y: 0},
  ]));

  console.log('Six points, regular hexagon (6)');
  console.table(findSymmetryLines([
    {x: 2, y: 0},
    {x: 1, y: Math.sqrt(3)},
    {x: -1, y: Math.sqrt(3)},
    {x: -2, y: 0},
    {x: -1, y: -Math.sqrt(3)},
    {x: 1, y: -Math.sqrt(3)},
  ]));
}
