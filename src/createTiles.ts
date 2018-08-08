import {imgDataModel, puzzlesDataModel} from './puzzle-game';

function createImg(rows: number, cols: number, id: number, x: number, y: number, degree: number, img: imgDataModel) {
  let coef = 1;
  if (img.width > img.height) {
    coef = img.width / img.height;
  }

  return `<div class="draggable" style="transform: rotate(${degree}deg);">
        <span class="img-cell" id="${id}" style="
        background: url(${img.url}) no-repeat ${-y*100}px ${-x*100}px;
        background-size: ${100*coef*rows}%;
        grid-row: ${x+1}/${x+2}; grid-column: ${y+1}/${y+2};"></span>
        </div>`;
}

function createTiles(rows: number, cols: number, img: imgDataModel) {
  const result = [];
  let id = 0;

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      const degree = Math.floor(Math.random() * 4) * 90;
      const tile: puzzlesDataModel = {
        row: x,
        col: y,
        coords: [{x: undefined, y: undefined}, {x: undefined, y: undefined}, {x: undefined, y: undefined}, {x: undefined, y: undefined}],
        rotation: degree,
        neighbourLeft: y !== 0 ? id - 1 : -1,
        neighbourRight: y !== cols - 1 ? id + 1 : -1,
        neighbourTop: x !== 0 ? id - cols : -1,
        neighbourBottom: x !== rows - 1 ? id + cols : -1,
        img: createImg(rows, cols, id, x, y, degree, img),
      };
      id++;
      result.push(tile);
    }
  }

  return result;
}

export {createImg, createTiles};