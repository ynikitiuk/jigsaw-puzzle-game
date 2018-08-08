// "use strict";

import {createTiles} from './createTiles';
import {shuffleTiles} from './shuffleTiles';
import {insertTiles} from './insertTiles';
import {updateCoords} from './updateCoords';
import {checkPosition} from './checkPosition';

export interface puzzlesDataModel {
  row: number,
  col: number,
  coords: Array<{x: number|undefined, y: number|undefined}>,
  rotation: number,
  neighbourLeft: number,
  neighbourRight: number,
  neighbourTop: number,
  neighbourBottom: number,
  img: string
}

export interface imgDataModel {
  width: number,
  height: number,
  url: string
}

const imgData: imgDataModel = {
  width: 0,
  height: 0,
  url: ''
};

export let puzzlesData: Array<puzzlesDataModel>;

const preview = document.getElementById('preview');
const file: HTMLInputElement = document.querySelector('#file');

function clearField() {
  const field = document.getElementById('field');
  field.innerHTML = '';
  const elements = document.getElementsByClassName('draggable');
  while (elements[0]) {
    elements[0].remove();
  }
}

function uploadImageData(url: string) {
    const image = new Image();

    image.addEventListener('load', function () {
        imgData.width = image.width;
        imgData.height = image.height;
    });

    imgData.url = url;
    image.src = url;
    preview.style.backgroundImage = `url(${url})`;
    preview.classList.add('show');
}

file.addEventListener('change', function() {
  if (file.files[0]) {
    clearField();
    uploadImageData(URL.createObjectURL(file.files[0]));
  }
});

const select: HTMLSelectElement = document.querySelector('#list');
uploadImageData(select.value);

select.addEventListener('change', function() {
    clearField();
    uploadImageData(select.value);
});

const hint = document.getElementById('hint');
hint.addEventListener('click', function(){
  preview.classList.toggle('show');
});

const start = document.getElementById('start');
start.addEventListener('click', function(){
  if (imgData.url === undefined) {
    alert('Please, choose an image!');
    return;
  }
  clearField();
  preview.classList.remove('show');
  puzzlesData = createTiles(4, 4, imgData);
  const shuffledTiles: Array<puzzlesDataModel> = shuffleTiles(puzzlesData);
  const container = document.getElementById('image-sliced');
  insertTiles(shuffledTiles, container);
});

document.addEventListener('mousedown', function (event: MouseEvent) {

  if ((<HTMLElement>event.target).className !== 'img-cell') return;
  const dragElement = <HTMLElement>(<HTMLElement>event.target).closest('.draggable');
  if (!dragElement) return;

  event.preventDefault();
  let startX: number, startY: number, shiftX: number, shiftY: number;

  startDrag(event.clientX, event.clientY);

  // remember the initial shift and start position
  // move the element as a direct child of body
  function startDrag(clientX: number, clientY: number) {
    shiftX = clientX - dragElement.getBoundingClientRect().left;
    shiftY = clientY - dragElement.getBoundingClientRect().top;
    startX = dragElement.getBoundingClientRect().left + shiftX;
    startY = dragElement.getBoundingClientRect().top + shiftY;

    if (dragElement.style.position !== 'absolute') {
      dragElement.style.position = 'absolute';
      dragElement.style.display = "grid";
      dragElement.style.left = clientX - shiftX + 'px';
      dragElement.style.top = clientY - shiftY + 'px';
    }
    document.body.appendChild(dragElement);
  }

  document.addEventListener('mousemove', onMouseMove);

  dragElement.addEventListener('mouseup', onMouseUp);

  function onMouseUp(event: MouseEvent) {
    document.removeEventListener('mousemove', onMouseMove);
    dragElement.removeEventListener('mouseup', onMouseUp);
    // If position didn't change, treat is as a click
    if (startX === event.clientX &&
      startY === event.clientY) onClick(dragElement);
    updateCoords(dragElement);
    checkPosition(dragElement);
  }

  function onMouseMove(event: MouseEvent) {
    // Remember initial coordinates
    startX = dragElement.getBoundingClientRect().left + shiftX;
    startY = dragElement.getBoundingClientRect().top + shiftY;
    moveAt(event.clientX, event.clientY);
  }

  function moveAt(clientX: number, clientY: number) {
    const diffX = clientX - startX;
    const diffY = clientY - startY;
    dragElement.style.left = parseInt(dragElement.style.left) + diffX + 'px';
    dragElement.style.top = parseInt(dragElement.style.top) + diffY + 'px';
  }
});


document.addEventListener('touchstart', function (event: TouchEvent) {

  if ((<HTMLElement>event.target).className !== 'img-cell') return;
  const dragElement = <HTMLElement>(<HTMLElement>event.target).closest('.draggable');
  if (!dragElement) return;

  event.preventDefault();
  let startX: number, startY: number, shiftX: number, shiftY: number;

  startDrag(event.touches[0].clientX, event.touches[0].clientY);

  // remember the initial shift and start position
  // move the element as a direct child of body
  function startDrag(clientX: number, clientY: number) {
    shiftX = clientX - dragElement.getBoundingClientRect().left;
    shiftY = clientY - dragElement.getBoundingClientRect().top;
    startX = dragElement.getBoundingClientRect().left + shiftX;
    startY = dragElement.getBoundingClientRect().top + shiftY;

    if (dragElement.style.position !== 'absolute') {
      dragElement.style.position = 'absolute';
      dragElement.style.display = "grid";
      dragElement.style.left = clientX - shiftX + 'px';
      dragElement.style.top = clientY - shiftY + 'px';
    }
    document.body.appendChild(dragElement);
  }

  document.addEventListener('touchmove', onMouseMove);

  dragElement.addEventListener('touchend', onMouseUp);

  function onMouseUp() {
    document.removeEventListener('touchmove', onMouseMove);
    dragElement.removeEventListener('touchend', onMouseUp);
    updateCoords(dragElement);
    checkPosition(dragElement);
  }

  function onMouseMove(event: TouchEvent) {
    // Remember initial coordinates
    startX = dragElement.getBoundingClientRect().left + shiftX;
    startY = dragElement.getBoundingClientRect().top + shiftY;
    moveAt(event.touches[0].clientX, event.touches[0].clientY);
  }

  function moveAt(clientX: number, clientY: number) {
    const diffX = clientX - startX;
    const diffY = clientY - startY;
    dragElement.style.left = parseInt(dragElement.style.left) + diffX + 'px';
    dragElement.style.top = parseInt(dragElement.style.top) + diffY + 'px';
  }
});

function onClick(dragElement: HTMLElement) {
  // Rotate element by 90 degrees clockwise
  let degree = +dragElement.style.transform.replace(/\D+/g, '') + 90;
  if (degree === 360) degree = 0;
  dragElement.style.transform = `rotate(${degree}deg)`;

  for (let child of [].slice.call(dragElement.children)) {
    puzzlesData[child.id].rotation = degree;
  }
}