# Lines of symmetry

## Problem statement

> Create and implement an algorithm that, when given a set of points on an infinite plane,
will return the complete set of lines of symmetry for those points.

## Observations

1. Lines of symmetry all intersect at the averaged center of the points.
2. Lines of symmetry are rotationally symmetric with respect to the averaged center.
3. For N points, there are at most N lines of symmetry.
4. For N points, the possible numbers of lines of symmetry are defined by
the set of factors of N or of N-1 (when one point coincides with the averaged center).

## Algorithm

- Find any line of symmetry. If none found, there are no lines of symmetry.
- Find the remaining lines of symmetry by rotating the first line of symmetry according to observations 1-4.

[More details here](./src/find-symmetry-lines.ts)

## Assumptions

1. Points are separated by some minimum distance as [defined here](./src/find-symmetry-lines.ts).

## Install dependencies

```npm install```

## Run test cases

```npm start```
