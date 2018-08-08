import {updateCoords} from "./updateCoords";
import {checkNeighbours} from "./checkNeighbours";
import {puzzlesData} from "./puzzle-game";

export function checkPosition(dragElement: HTMLElement) {
  const field = document.getElementById('field');
  const tile = puzzlesData[Number(dragElement.firstElementChild.id)];
  const tilePositionTop = field.offsetTop + field.clientTop + tile.row * 100;
  const tilePositionLeft = field.offsetLeft + field.clientLeft + tile.col * 100;
  const tileCoords = dragElement.firstElementChild.getBoundingClientRect();

  if (+dragElement.style.transform.replace(/\D+/g, '') === 0 &&
    Math.abs(tilePositionTop - tileCoords.top) < 3 &&
    Math.abs(tilePositionLeft - tileCoords.left) < 3) {
    (<any>field).append(...[].slice.call(dragElement.children));
    dragElement.remove();
    updateCoords(field);
    return;
  }

  checkNeighbours(dragElement);
}