import {updateCoords} from "./updateCoords";

export function combineCells(dragElement: HTMLElement, divsToMerge: Array<HTMLElement>) {
  for (let div of divsToMerge) {
    const newX = Math.min(parseInt(dragElement.style.left), parseInt(div.style.left));
    const newY = Math.min(parseInt(dragElement.style.top), parseInt(div.style.top));
    (<any>dragElement).append(...[].slice.call(div.children));
    dragElement.style.left = newX + "px";
    dragElement.style.top = newY + "px";
    div.remove();
  }
  updateCoords(dragElement);
}