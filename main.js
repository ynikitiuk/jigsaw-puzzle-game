"use strict";

function createPuzzles(rows, cols) {
  let shiftX = 100 / (cols - 1);
  let shiftY = 100 / (rows - 1);
  
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      let tile = {};
      tile.id = x * cols + y;
      let degree = Math.floor(Math.random() * 4) * 90;
      tile.img = `<div class="draggable" style="transform: rotate(${degree}deg);">
        <span class="img-cell" id="${tile.id}" style="background-position: ${y*shiftX}% ${x*shiftY}%;
        grid-row: ${x+1}/${x+2}; grid-column: ${y+1}/${y+2};"></span>
      </div>`;
      puzzlesData[tile.id] = {};
      puzzlesData[tile.id].coords = [{}, {}, {}, {}];
      puzzlesData[tile.id].rotation = degree;
      puzzlesData[tile.id].neighbourLeft = y !== 0 ? tile.id - 1 : "none";
      puzzlesData[tile.id].neighbourRight = y !== cols - 1 ? tile.id + 1 : "none";
      puzzlesData[tile.id].neighbourTop = x !== 0 ? tile.id - cols : "none";
      puzzlesData[tile.id].neighbourBottom = x !== rows - 1 ? tile.id + cols : "none";

      puzzlesArr.push(tile);
    }
  }
}

function shufflePuzzles(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
}

function insertPuzzles(array) {
  let container = document.getElementById('image-sliced');
  for (let tile of array) {
    container.insertAdjacentHTML('beforeend', tile.img);
  }
}

document.addEventListener('mousedown', function(event) {

  if (event.target.className !== 'img-cell') return;
  let dragElement = event.target.closest('.draggable');

  event.preventDefault();
  let startX, startY, shiftX, shiftY;

  startDrag(event.clientX, event.clientY);

  document.addEventListener('mousemove', onMouseMove);

  dragElement.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    dragElement.onmouseup = null;
    if (startX === event.clientX &&
        startY === event.clientY) onClick();
    updateCoords();
    checkNeighbours();
  };

  function onMouseMove(event) {
    //Remember initial coordinates
    startX = dragElement.getBoundingClientRect().left + shiftX;
    startY = dragElement.getBoundingClientRect().top + shiftY;
    moveAt(event.clientX, event.clientY);
  }

  // remember the initial shift
  // move the element as a direct child of body
  function startDrag(clientX, clientY) {
    shiftX = clientX - dragElement.getBoundingClientRect().left;
    shiftY = clientY - dragElement.getBoundingClientRect().top;
    startX = dragElement.getBoundingClientRect().left + shiftX;
    startY = dragElement.getBoundingClientRect().top + shiftY;

    if (dragElement.style.position !== 'absolute') {
      dragElement.style.position = 'absolute';
      dragElement.style.left = clientX - shiftX + 'px';
      dragElement.style.top = clientY - shiftY + 'px';
      document.body.append(dragElement);
    }
  }

  function moveAt(clientX, clientY) {
    let diffX = clientX - startX;
    let diffY = clientY - startY;
    dragElement.style.left = parseInt(dragElement.style.left) + diffX + 'px';
    dragElement.style.top = parseInt(dragElement.style.top) + diffY + 'px';
  }

  function onClick() {
    // Rotate element by 90 degrees clockwise
    let degree = +dragElement.style.transform.replace( /\D+/g, '') + 90;
    if (degree == 360) degree = 0;
    
    for (let child of dragElement.children) {
      puzzlesData[child.id].rotation = degree;
    }

    dragElement.style.transform = `rotate(${degree}deg)`;
  }

  function updateCoords() {
    for (let child of dragElement.children) {
      let tile = puzzlesData[child.id];
      let tileDiv = document.getElementById(`${child.id}`);
      let tileDivCoords = tileDiv.getBoundingClientRect();
      tile.coords[0] = {
        x: parseInt(tileDivCoords.left),
        y: parseInt(tileDivCoords.top)
      };
      tile.coords[1] = {
        x: parseInt(tileDivCoords.left) + tileDiv.clientWidth,
        y: parseInt(tileDivCoords.top)
      };
      tile.coords[2] = {
        x: parseInt(tileDivCoords.left) + tileDiv.clientWidth,
        y: parseInt(tileDivCoords.top) + tileDiv.clientHeight
      };
      tile.coords[3] = {
        x: parseInt(tileDivCoords.left),
        y: parseInt(tileDivCoords.top) + tileDiv.clientHeight
      };

      switch (tile.rotation) {
        case 0:
          break;
        case 270:
          tile.coords.push(tile.coords.shift());
        case 180:
          tile.coords.push(tile.coords.shift());
        case 90:
          tile.coords.push(tile.coords.shift());
      }
    }
  }

  function checkNeighbours() {
    let divsToMerge = [];
    for (let child of dragElement.children) {
      let tile = puzzlesData[child.id];

      if (tile.neighbourLeft != "none" &&
        Math.abs(tile.coords[0].x - puzzlesData[tile.neighbourLeft].coords[1].x) < 3 &&
        Math.abs(tile.coords[0].y - puzzlesData[tile.neighbourLeft].coords[1].y) < 3 &&
        tile.rotation == puzzlesData[tile.neighbourLeft].rotation) {
          let neighbourDiv = document.getElementById(tile.neighbourLeft).parentNode;
          if (!divsToMerge.includes(neighbourDiv)) divsToMerge.push(neighbourDiv);
          puzzlesData[tile.neighbourLeft].neighbourRight = "none";
          tile.neighbourLeft = "none";
      }

      if (tile.neighbourRight != "none" &&
        Math.abs(tile.coords[2].x - puzzlesData[tile.neighbourRight].coords[3].x) < 3 &&
        Math.abs(tile.coords[2].y - puzzlesData[tile.neighbourRight].coords[3].y) < 3 &&
        tile.rotation == puzzlesData[tile.neighbourRight].rotation) {
          let neighbourDiv = document.getElementById(tile.neighbourRight).parentNode;
          if (!divsToMerge.includes(neighbourDiv)) divsToMerge.push(neighbourDiv);
          puzzlesData[tile.neighbourRight].neighbourLeft = "none";
          tile.neighbourRight = "none";
      }

      if (tile.neighbourTop != "none" &&
        Math.abs(tile.coords[0].x - puzzlesData[tile.neighbourTop].coords[3].x) < 3 &&
        Math.abs(tile.coords[0].y - puzzlesData[tile.neighbourTop].coords[3].y) < 3 &&
        tile.rotation == puzzlesData[tile.neighbourTop].rotation) {
          let neighbourDiv = document.getElementById(tile.neighbourTop).parentNode;
          if (!divsToMerge.includes(neighbourDiv)) divsToMerge.push(neighbourDiv);
          puzzlesData[tile.neighbourTop].neighbourBottom = "none";
          tile.neighbourTop = "none";
      }

      if (tile.neighbourBottom != "none" &&
        Math.abs(tile.coords[2].x - puzzlesData[tile.neighbourBottom].coords[1].x) < 3 &&
        Math.abs(tile.coords[2].y - puzzlesData[tile.neighbourBottom].coords[1].y) < 3 &&
        tile.rotation == puzzlesData[tile.neighbourBottom].rotation) {
          let neighbourDiv = document.getElementById(tile.neighbourBottom).parentNode;
          if (!divsToMerge.includes(neighbourDiv)) divsToMerge.push(neighbourDiv);
          puzzlesData[tile.neighbourBottom].neighbourTop = "none";
          tile.neighbourBottom = "none";
      }
    }

    if (divsToMerge.length !== 0) combineCells(divsToMerge);
  }

  function combineCells(divsToMerge) {
    for (let div of divsToMerge) {
      let newX = Math.min(parseInt(dragElement.style.left), parseInt(div.style.left));
      let newY = Math.min(parseInt(dragElement.style.top), parseInt(div.style.top));
      dragElement.style.display = "grid";
      dragElement.append(...div.children);
      dragElement.style.left = newX + "px";
      dragElement.style.top = newY + "px";
      div.remove();
    }
    updateCoords();
  }
});

let puzzlesArr = [];
let puzzlesData = [];

createPuzzles(4, 4);
shufflePuzzles(puzzlesArr);
insertPuzzles(puzzlesArr);