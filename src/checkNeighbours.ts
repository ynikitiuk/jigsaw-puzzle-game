import {puzzlesData} from "./puzzle-game";
import {combineCells} from "./combineCells";
import {puzzlesDataModel} from './puzzle-game';

export function checkNeighbours(dragElement: HTMLElement) {
  const divsToMerge: Array<HTMLElement> = [];
  for (let child of [].slice.call(dragElement.children)) {
    const tile: puzzlesDataModel = puzzlesData[child.id];
    let neighbour: puzzlesDataModel;

    if (tile.neighbourLeft !== -1) {
      neighbour = puzzlesData[tile.neighbourLeft];
      if (checkCorners(tile, 0, neighbour, 1)) {
        addDivToMerge(divsToMerge, tile.neighbourLeft);
        neighbour.neighbourRight = -1;
        tile.neighbourLeft = -1;
      }
    }

    if (tile.neighbourRight !== -1) {
      neighbour = puzzlesData[tile.neighbourRight];
      if (checkCorners(tile, 2, neighbour, 3)) {
        addDivToMerge(divsToMerge, tile.neighbourRight);
        neighbour.neighbourLeft = -1;
        tile.neighbourRight = -1;
      }
    }

    if (tile.neighbourTop !== -1) {
      neighbour = puzzlesData[tile.neighbourTop];
      if (checkCorners(tile, 0, neighbour, 3)) {
        addDivToMerge(divsToMerge, tile.neighbourTop);
        neighbour.neighbourBottom = -1;
        tile.neighbourTop = -1;
      }
    }

    if (tile.neighbourBottom !== -1) {
      neighbour = puzzlesData[tile.neighbourBottom];
      if (checkCorners(tile, 2, neighbour, 1)) {
        addDivToMerge(divsToMerge, tile.neighbourBottom);
        neighbour.neighbourTop = -1;
        tile.neighbourBottom = -1;
      }
    }
  }

  if (divsToMerge.length !== 0) combineCells(dragElement, divsToMerge);
}

export function checkCorners (tile: puzzlesDataModel, corner1: number, neighbour: puzzlesDataModel, corner2: number){
  return Math.abs(tile.coords[corner1].x - neighbour.coords[corner2].x) < 3 &&
    Math.abs(tile.coords[corner1].y - neighbour.coords[corner2].y) < 3 &&
    tile.rotation === neighbour.rotation;
}

export function addDivToMerge(divsToMerge: Array<HTMLElement>, neighbour: number) {
  const neighbourDiv = <HTMLElement>document.getElementById(`${neighbour}`).parentNode;
  if (!(<any>divsToMerge).includes(neighbourDiv)) divsToMerge.push(neighbourDiv);
  return divsToMerge;
}