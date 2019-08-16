import { Point, Line } from './interfaces';
import { rotatePoint } from './rotate-point';
import { projectPointOntoLine } from './project-point';

// Toggle debug logging.
const DEBUG = false;

// Error tolerance in distance unit.
export const EPSILON = 1e-10;

export function findSymmetryLines(points: Point[]): Line[] {

  // Zero points means zero lines of symmetry.
  // One point means infinite lines of symmetry.
  if (points.length < 2) {
    return [];
  }

  // Find global center among all points.
  const globalCenter = findCenterPoint(points);
  debug(() => {
    console.log('globalCenter');
    console.table(globalCenter);
  });

  // Find first line that reflects all points. That line is one of the lines of symmetry.
  const firstLine = findFirstLine(points);
  debug(() => {
    console.log('firstLine');
    console.table(firstLine);
  });

  if (!firstLine) {
    return [];
  }

  // Find the remaining lines by rotating the first line.
  // For N points, there are at most N lines of symmetry.
  // The number of lines of symmetry is a factor of N or of N - 1 (when one point coincides with the global center).
  // For each factor in decreasing order starting from N, rotate the first line by π/N.
  // Return the first factor where all points are reflected by the rotated line.
  const N = points.length;
  const factors = [
    ...factorize(N),
    ...factorize(N-1),
  ].slice().sort().reverse();
  debug(() => {
    console.log('factors');
    console.log(factors);
  });

  const factor = factors.find((factor) => {
    const radians = Math.PI / factor;
    const rotatedLine = rotateLine(firstLine, radians, globalCenter);
    return doesLineReflectAllPoints(rotatedLine, points);
  })!; // There will always be at least one factor (1) that reflects all points
  debug(() => {
    console.log('factor');
    console.log(factor);
  });

  // There are `factor` number of lines of symmetry. Expand on the first line by rotating it `factor` times.
  const lines: Line[] = [];
  for (let f = 0; f < factor; f++) {
    lines.push(rotateLine(firstLine, f * Math.PI / N, globalCenter));
  }
  debug(() => {
    console.log('lines');
    console.table(lines);
  });

  return lines;
}

// Find first line that reflects all points. Each pair of points has two potential
// lines of symmetry lines, one that passes through the points and one normal
// to that line that also passes through the midpoint of the pair of points.
function findFirstLine(points: Point[]): Line | undefined {
  // N choose 2
  for (let p = 0; p < points.length - 1; p++) {
    for (let q = p + 1; q < points.length; q++) {
      const pair: [Point, Point] = [
        points[p],
        points[q],
      ];
      const crossLine: Line = {
        p1: pair[0],
        p2: pair[1],
      };
      if (doesLineReflectAllPoints(crossLine, points)) {
        return crossLine;
      }
      const normalLine: Line = bisectLine(crossLine);
      if (doesLineReflectAllPoints(normalLine, points)) {
        return normalLine;
      }
    }
  }
  return;
}

function rotateLine(line: Line, radians: number, around: Point): Line {
  const rotatedP1 = rotatePoint({x: line.p1.x - around.x, y: line.p1.y - around.y}, radians);
  const rotatedP2 = rotatePoint({x: line.p2.x - around.x, y: line.p2.y - around.y}, radians);
  const lineOut: Line = {
    p1: {x: rotatedP1.x + around.x, y: rotatedP1.y + around.y},
    p2: {x: rotatedP2.x + around.x, y: rotatedP2.y + around.y},
  };
  return lineOut;
}

// Return all factors of a number, largest first.
function factorize(n: number): number[] {
  const out: number[] = [];
  for (let i = n; i >= 1; i--) {
    if (n % i === 0) {
      out.push(i);
    }
  }
  return out;
}

// Return the average point for a set of points.
function findCenterPoint(points: Point[]): Point {
  const px = points.reduce((sum, point) => sum + point.x, 0) / points.length;
  const py = points.reduce((sum, point) => sum + point.y, 0) / points.length;
  const p: Point = {
    x: px,
    y: py,
  };
  return p;
}

function doesLineReflectAllPoints(line: Line, points: Point[]): boolean {
  return points.every((point) => {
    const reflectedPoint = reflectPointAcrossLine(point, line);
    return Boolean(points.find((otherPoint) => {
      return (
        isNearZero(reflectedPoint.x - otherPoint.x) &&
        isNearZero(reflectedPoint.y - otherPoint.y)
      );
    }));
  });
}

// Determine if a number is "zero" (less than some small value epsilon).
// Rounded floating point numbers are often close but not exact.
function isNearZero(value: number): boolean {
  return Math.abs(value) < EPSILON;
}

// Return point resulting from reflection of given point across given line.
function reflectPointAcrossLine(point: Point, line: Line): Point {
  const projectedPoint = projectPointOntoLine(point, line);
  const dx = projectedPoint.x - point.x;
  const dy = projectedPoint.y - point.y;
  const reflectedPoint: Point = {
    x: point.x + 2 * dx,
    y: point.y + 2 * dy,
  };
  return reflectedPoint;
}

// Create line perpendicular to given line that passes through
// the midpoint of the two points that define the line.
export function bisectLine(line: Line): Line {
  const midpoint = findCenterPoint([line.p1, line.p2]);
  // Center line at its midpoint.
  // Line represented by a vector (Point).
  const shiftedLine: Point = {
    x: line.p1.x - midpoint.x,
    y: line.p1.y - midpoint.y,
  };
  // Swap x and y and negate.
  const shiftedBisector: Point = {
    x: -shiftedLine.y,
    y: shiftedLine.x,
  };
  // Unshift line
  const bisector: Line = {
    p1: midpoint,
    p2: {
      x: shiftedBisector.x + midpoint.x,
      y: shiftedBisector.y + midpoint.y,
    },
  };
  return bisector;
}

function debug(fn: () => void) {
  if (DEBUG) {
    fn();
  }
}
