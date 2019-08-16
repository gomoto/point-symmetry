import { projectPointOntoLine } from './project-point';
import { Point, Line } from './interfaces';

const data: {point: Point, line: Line}[] = [
  {
    point: {x: 1, y: 1},
    line: {
      p1: {x: 0, y: 0},
      p2: {x: 1, y: 1},
    }
  },
  {
    point: {x: 0, y: 2},
    line: {
      p1: {x: 0, y: 0},
      p2: {x: 1, y: 1},
    }
  },
  {
    point: {x: 0, y: 1},
    line: {
      p1: {x: 0, y: 0},
      p2: {x: 1, y: 1},
    }
  },
  {
    point: {x: 0, y: 0},
    line: {
      p1: {x: 0, y: -1},
      p2: {x: 1, y: 0},
    }
  },
  // horizontal line
  {
    point: {x: 0, y: 0},
    line: {
      p1: {x: -10, y: 1},
      p2: {x: 10, y: 1},
    }
  },
  // vertical line
  {
    point: {x: 0, y: 0},
    line: {
      p1: {x: 1, y: 100},
      p2: {x: 1, y: -100},
    }
  },
  {
    point: {x: 0, y: 0},
    line: {
      p1: {x: -1, y: 0},
      p2: {x: 0, y: -2},
    }
  },
];

data.forEach((d) => {
  console.log('------------------------');
  const projected = projectPointOntoLine(d.point, d.line);
  console.log('Projecting point');
  console.table(d.point);
  console.log('onto line');
  console.table(d.line);
  console.log('yields');
  console.table(projected);
});
