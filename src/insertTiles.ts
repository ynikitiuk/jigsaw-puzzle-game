import {puzzlesDataModel} from './puzzle-game';

export function insertTiles(array: Array<puzzlesDataModel>, container: HTMLElement): void {
  let insertHtml = '';
  for (let tile of array) {
    insertHtml += tile.img;
  }
  container.insertAdjacentHTML('beforeend', insertHtml);
}
