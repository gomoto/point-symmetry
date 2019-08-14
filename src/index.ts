import { findSymmetryLines, linesUnique } from './find-symmetry-lines';
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

  // Testing lines with large but non-infinite slopes
  testSymmetry('Five points, square plus center point, rotated and slightly askew', 4, [
    {x: 1, y: 0},
    {x: 1e-8, y: 1}, // large positive slope for line through this point and center point
    {x: -1, y: 0},
    {x: 1e-8, y: -1}, // large negative slope for line through this point and center point
    {x: 0, y: 0}, // center point
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

  testSymmetry('Six points, nested equilateral triangles, one rotated 30 degrees (rotational symmetry but no reflectional symmetry)', 0, [
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

  // Other

  testSymmetry('Two parallel lines', 1, [
    {x: 0, y: 5},
    {x: 1, y: 5},
    {x: 3, y: 5},
    {x: 0, y: -5},
    {x: 1, y: -5},
    {x: 3, y: -5},
  ]);

  testSymmetry('Arrow', 1, [
    {x: 0, y: 1},
    {x: 1, y: 1},
    {x: 2, y: 1},
    {x: 3, y: 1},
    {x: 2, y: 2},
    {x: 0, y: -1},
    {x: 1, y: -1},
    {x: 2, y: -1},
    {x: 3, y: -1},
    {x: 2, y: -2},
    {x: 4, y: 0},
  ]);

  testSymmetry('Intersecting lines', 2, [
    {x: 0, y: 0},
    {x: -2, y: -6},
    {x: -1, y: -3},
    {x: 1, y: 3},
    {x: 2, y: 6},
    {x: -2, y: 6},
    {x: -1, y: 3},
    {x: 1, y: -3},
    {x: 2, y: -6},
  ]);

}

// Test reflectional symmetry for the given point configuration
// and for rotations and translations of the configuration.
// The number of symmetry lines should be the same for all
// transformations of a single point configuration.
function testSymmetry(message: string, expectedLineCount: number, points: Point[]): void {
  // List of rotations (radians) to test.
  const rotations: number[] = [
    0, // 0°
    1e-8, // 0.0000005729...°
    1, // 57.29578...°
    2, // 114.59156...°
    (1 / 6) * Math.PI, // 30°
    (1 / 4) * Math.PI, // 45°
    (1 / 3) * Math.PI, // 60°
    (1 / 2) * Math.PI, // 90°
    (2 / 3) * Math.PI, // 120°
    Math.PI, // 180°
    (3 / 2) * Math.PI, // 270°
    2 * Math.PI, // 360°
  ];

  // List of translations to test.
  const LARGE_TRANSLATION = 1000;
  const translations: Point[] = [
    {x: 0, y: 0},
    createUnitCircleTranslation(0), // 0°
    createUnitCircleTranslation(Math.PI / 6), // 30°
    createUnitCircleTranslation(Math.PI / 4), // 45°
    createUnitCircleTranslation(Math.PI / 3), // 60°
    createUnitCircleTranslation(Math.PI / 2), // 90°
    createUnitCircleTranslation((2 / 3) * Math.PI), // 120°
    createUnitCircleTranslation(Math.PI), // 180°
    createUnitCircleTranslation((3 / 2) * Math.PI), // 270°
    createUnitCircleTranslation(2 * Math.PI), // 360°
    {x: LARGE_TRANSLATION, y: 0},
    {x: LARGE_TRANSLATION, y: LARGE_TRANSLATION},
    {x: 0, y: LARGE_TRANSLATION},
    {x: -LARGE_TRANSLATION, y: LARGE_TRANSLATION},
    {x: -LARGE_TRANSLATION, y: 0},
    {x: -LARGE_TRANSLATION, y: -LARGE_TRANSLATION},
    {x: 0, y: -LARGE_TRANSLATION},
    {x: LARGE_TRANSLATION, y: -LARGE_TRANSLATION},
  ];

  translations.forEach((translation) => {
    const translatedPoints = translatePoints(points, translation);
    rotations.forEach((rotation) => {
      const translatedRotatedPoints = rotatePoints(translatedPoints, rotation);
      console.log();
      console.log('--------');
      console.log();
      console.log(message);
      console.log('Rotation (radians):', rotation);
      console.log('Translation:', translation);
      console.log();
      testPoints(expectedLineCount, translatedRotatedPoints);
    });
  });
}

function testPoints(expectedLineCount: number, points: Point[]): void {
  console.log('Points:');
  console.table(points);
  const lines = findSymmetryLines(points);
  console.log('Symmetry lines:');
  console.table(lines);
  assert.equal(lines.length, expectedLineCount);
  assert.ok(linesUnique(lines));
}

function rotatePoints(points: Point[], radians: number): Point[] {
  // ⎡ cosθ -sinθ ⎤  ⎡ x ⎤   ⎡ xcosθ - ysinθ ⎤
  // ⎢            ⎥  ⎢   ⎥ = ⎢               ⎥
  // ⎣ sinθ  cosθ ⎦  ⎣ y ⎦   ⎣ xsinθ + ycosθ ⎦
  const rotatedPoints = points.map((point) => {
    const rotatedPoint: Point = {
      x: point.x * Math.cos(radians) - point.y * Math.sin(radians),
      y: point.x * Math.sin(radians) + point.y * Math.cos(radians),
    };
    return rotatedPoint;
  });
  return rotatedPoints;
}

function translatePoints(points: Point[], translation: Point): Point[] {
  const translatedPoints = points.map((point) => {
    const translatedPoint: Point = {
      x: point.x + translation.x,
      y: point.y + translation.y,
    };
    return translatedPoint;
  });
  return translatedPoints;
}

// Return point on the unit circle at the specified angle in radians.
function createUnitCircleTranslation(radians: number): Point {
  const translation: Point = {
    x: Math.cos(radians),
    y: Math.sin(radians),
  };
  return translation;
}
