"use strict";

function createPuzzles(rows, cols) {
  let shiftX = 100 / (cols - 1);
  let shiftY = 100 / (rows - 1);
  
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      let puzzle = {};
      puzzle.id = x * cols + y;
      let degree = Math.floor(Math.random() * 4) * 90;
      puzzle.img = `<div class="draggable" style="transform: rotate(${degree}deg);">
        <span class="img-cell" id="${puzzle.id}" style="background-position: ${y*shiftX}% ${x*shiftY}%;
        grid-row: ${x+1}/${x+2}; grid-column: ${y+1}/${y+2};"></span>
      </div>`;
      puzzlesData[puzzle.id] = {};
      puzzlesData[puzzle.id].coords = [{}, {}, {}, {}];
      puzzlesData[puzzle.id].rotation = degree;
      puzzlesData[puzzle.id].neighbourLeft = y !== 0 ? puzzle.id - 1 : "none";
      puzzlesData[puzzle.id].neighbourRight = y !== cols - 1 ? puzzle.id + 1 : "none";
      puzzlesData[puzzle.id].neighbourTop = x !== 0 ? puzzle.id - cols : "none";
      puzzlesData[puzzle.id].neighbourBottom = x !== rows - 1 ? puzzle.id + cols : "none";

      puzzlesArr.push(puzzle);
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
  for (let elem of array) {
    container.insertAdjacentHTML('beforeend', elem.img);
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
    let degree = +dragElement.style.transform.replace( /\D+/g, '');
    degree += 90;
    if (degree == 360) degree = 0;
    
    for (let child of dragElement.children) {
      puzzlesData[child.id].rotation = degree;
    }

    dragElement.style.transform = `rotate(${degree}deg)`;
  }

  function updateCoords() {
    for (let child of dragElement.children) {
      let puzzle = puzzlesData[child.id];
      let puzzleDiv = document.getElementById(`${child.id}`);
      let puzzleDivCoords = puzzleDiv.getBoundingClientRect();
      puzzle.coords[0] = {
        x: parseInt(puzzleDivCoords.left),
        y: parseInt(puzzleDivCoords.top)
      };
      puzzle.coords[1] = {
        x: parseInt(puzzleDivCoords.left) + puzzleDiv.clientWidth,
        y: parseInt(puzzleDivCoords.top)
      };
      puzzle.coords[2] = {
        x: parseInt(puzzleDivCoords.left) + puzzleDiv.clientWidth,
        y: parseInt(puzzleDivCoords.top) + puzzleDiv.clientHeight
      };
      puzzle.coords[3] = {
        x: parseInt(puzzleDivCoords.left),
        y: parseInt(puzzleDivCoords.top) + puzzleDiv.clientHeight
      };

      switch (puzzle.rotation) {
        case 0:
          break;
        case 270:
          puzzle.coords.push(puzzle.coords.shift());
        case 180:
          puzzle.coords.push(puzzle.coords.shift());
        case 90:
          puzzle.coords.push(puzzle.coords.shift());
      }
    }
  }

  function checkNeighbours() {
    let divsToMerge = [];
    for (let child of dragElement.children) {
      let puzzle = puzzlesData[child.id];

      if (puzzle.neighbourLeft != "none" &&
        Math.abs(puzzle.coords[0].x - puzzlesData[puzzle.neighbourLeft].coords[1].x) < 3 &&
        Math.abs(puzzle.coords[0].y - puzzlesData[puzzle.neighbourLeft].coords[1].y) < 3 &&
        puzzle.rotation == puzzlesData[puzzle.neighbourLeft].rotation) {
          let neighbourDiv = document.getElementById(puzzle.neighbourLeft).parentNode;
          if (!divsToMerge.includes(neighbourDiv)) divsToMerge.push(neighbourDiv);
          puzzlesData[puzzle.neighbourLeft].neighbourRight = "none";
          puzzle.neighbourLeft = "none";
      }

      if (puzzle.neighbourRight != "none" &&
        Math.abs(puzzle.coords[2].x - puzzlesData[puzzle.neighbourRight].coords[3].x) < 3 &&
        Math.abs(puzzle.coords[2].y - puzzlesData[puzzle.neighbourRight].coords[3].y) < 3 &&
        puzzle.rotation == puzzlesData[puzzle.neighbourRight].rotation) {
          let neighbourDiv = document.getElementById(puzzle.neighbourRight).parentNode;
          if (!divsToMerge.includes(neighbourDiv)) divsToMerge.push(neighbourDiv);
          puzzlesData[puzzle.neighbourRight].neighbourLeft = "none";
          puzzle.neighbourRight = "none";
      }

      if (puzzle.neighbourTop != "none" &&
        Math.abs(puzzle.coords[0].x - puzzlesData[puzzle.neighbourTop].coords[3].x) < 3 &&
        Math.abs(puzzle.coords[0].y - puzzlesData[puzzle.neighbourTop].coords[3].y) < 3 &&
        puzzle.rotation == puzzlesData[puzzle.neighbourTop].rotation) {
          let neighbourDiv = document.getElementById(puzzle.neighbourTop).parentNode;
          if (!divsToMerge.includes(neighbourDiv)) divsToMerge.push(neighbourDiv);
          puzzlesData[puzzle.neighbourTop].neighbourBottom = "none";
          puzzle.neighbourTop = "none";
      }

      if (puzzle.neighbourBottom != "none" &&
        Math.abs(puzzle.coords[2].x - puzzlesData[puzzle.neighbourBottom].coords[1].x) < 3 &&
        Math.abs(puzzle.coords[2].y - puzzlesData[puzzle.neighbourBottom].coords[1].y) < 3 &&
        puzzle.rotation == puzzlesData[puzzle.neighbourBottom].rotation) {
          let neighbourDiv = document.getElementById(puzzle.neighbourBottom).parentNode;
          if (!divsToMerge.includes(neighbourDiv)) divsToMerge.push(neighbourDiv);
          puzzlesData[puzzle.neighbourBottom].neighbourTop = "none";
          puzzle.neighbourBottom = "none";
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