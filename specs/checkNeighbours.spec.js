import {checkCorners} from "../src/checkNeighbours.ts";

describe('checkCorners()', () => {
  const puzzlesData = [];
  puzzlesData[4] = {
    coords: [{x: 122, y: 151}, {}, {}, {}],
    rotation: 90
  };
  puzzlesData[5] = {
    coords: [{}, {x: 120, y: 150}, {}, {}],
    rotation: 180
  };
  puzzlesData[6] = {
    coords: [{x: 122, y: 151}, {}, {}, {}],
    rotation: 180
  };
  it('Corners are next to each other, same rotation. Expect to return true', () => {
    expect(checkCorners(puzzlesData[5], 1, puzzlesData[6], 0)).toBeTruthy();
  });
  it('Corners are next to each other, different rotation. Expect to return false', () => {
    expect(checkCorners(puzzlesData[5], 1, puzzlesData[4], 0)).toBeFalsy();
  });
  puzzlesData[7] = {
    coords: [{}, {}, {x: 518, y: 651}, {}],
    rotation: 90
  };
  puzzlesData[11] = {
    coords: [{}, {}, {}, {x: 520, y: 650}],
    rotation: 90
  };
  puzzlesData[15] = {
    coords: [{}, {}, {x: 517, y: 651}, {}],
    rotation: 90
  };
  it('Corners are next to each other, expect to return true', () => {
    expect(checkCorners(puzzlesData[11], 3, puzzlesData[7], 2)).toBeTruthy();
  });
  it('Corners are more than 2px from each other. Expect to return false', () => {
    expect(checkCorners(puzzlesData[11], 3, puzzlesData[15], 2)).toBeFalsy();
  });
});