import {createTiles} from '../src/createTiles';

describe('createTiles()', () => {
  const img = {
    width: 1200,
    height: 1600,
    url: "://some-string"
  };
  const tiles = createTiles(4, 5, img);
  it('puzzle of 4 rows and 5 cols should return array of length 20', () => {
    expect(tiles.length).toEqual(20);
  });
  it('elements 0, 5, 10, 15 should not have left neighbour', () => {
    expect(tiles[0].neighbourLeft).toEqual('none');
    expect(tiles[5].neighbourLeft).toEqual('none');
    expect(tiles[10].neighbourLeft).toEqual('none');
    expect(tiles[15].neighbourLeft).toEqual('none');
  });
  it('elements 4, 9, 14, 19 should not have right neighbour', () => {
    expect(tiles[4].neighbourRight).toEqual('none');
    expect(tiles[9].neighbourRight).toEqual('none');
    expect(tiles[14].neighbourRight).toEqual('none');
    expect(tiles[19].neighbourRight).toEqual('none');
  });
  it('elements property rotation should be only 0, 90, 180 or 270', () => {
    for (let tile of tiles) {
      expect([0, 90, 180, 270]).toContain(tile.rotation);
    }
  });
});