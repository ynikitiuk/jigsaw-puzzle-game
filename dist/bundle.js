/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/puzzle-game.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/checkNeighbours.ts":
/*!********************************!*\
  !*** ./src/checkNeighbours.ts ***!
  \********************************/
/*! exports provided: checkNeighbours, checkCorners, addDivToMerge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkNeighbours", function() { return checkNeighbours; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkCorners", function() { return checkCorners; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDivToMerge", function() { return addDivToMerge; });
/* harmony import */ var _puzzle_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./puzzle-game */ "./src/puzzle-game.ts");
/* harmony import */ var _combineCells__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./combineCells */ "./src/combineCells.ts");


function checkNeighbours(dragElement) {
    var divsToMerge = [];
    for (var _i = 0, _a = [].slice.call(dragElement.children); _i < _a.length; _i++) {
        var child = _a[_i];
        var tile = _puzzle_game__WEBPACK_IMPORTED_MODULE_0__["puzzlesData"][child.id];
        var neighbour = void 0;
        if (tile.neighbourLeft !== -1) {
            neighbour = _puzzle_game__WEBPACK_IMPORTED_MODULE_0__["puzzlesData"][tile.neighbourLeft];
            if (checkCorners(tile, 0, neighbour, 1)) {
                addDivToMerge(divsToMerge, tile.neighbourLeft);
                neighbour.neighbourRight = -1;
                tile.neighbourLeft = -1;
            }
        }
        if (tile.neighbourRight !== -1) {
            neighbour = _puzzle_game__WEBPACK_IMPORTED_MODULE_0__["puzzlesData"][tile.neighbourRight];
            if (checkCorners(tile, 2, neighbour, 3)) {
                addDivToMerge(divsToMerge, tile.neighbourRight);
                neighbour.neighbourLeft = -1;
                tile.neighbourRight = -1;
            }
        }
        if (tile.neighbourTop !== -1) {
            neighbour = _puzzle_game__WEBPACK_IMPORTED_MODULE_0__["puzzlesData"][tile.neighbourTop];
            if (checkCorners(tile, 0, neighbour, 3)) {
                addDivToMerge(divsToMerge, tile.neighbourTop);
                neighbour.neighbourBottom = -1;
                tile.neighbourTop = -1;
            }
        }
        if (tile.neighbourBottom !== -1) {
            neighbour = _puzzle_game__WEBPACK_IMPORTED_MODULE_0__["puzzlesData"][tile.neighbourBottom];
            if (checkCorners(tile, 2, neighbour, 1)) {
                addDivToMerge(divsToMerge, tile.neighbourBottom);
                neighbour.neighbourTop = -1;
                tile.neighbourBottom = -1;
            }
        }
    }
    if (divsToMerge.length !== 0)
        Object(_combineCells__WEBPACK_IMPORTED_MODULE_1__["combineCells"])(dragElement, divsToMerge);
}
function checkCorners(tile, corner1, neighbour, corner2) {
    return Math.abs(tile.coords[corner1].x - neighbour.coords[corner2].x) < 3 &&
        Math.abs(tile.coords[corner1].y - neighbour.coords[corner2].y) < 3 &&
        tile.rotation === neighbour.rotation;
}
function addDivToMerge(divsToMerge, neighbour) {
    var neighbourDiv = document.getElementById("" + neighbour).parentNode;
    if (!divsToMerge.includes(neighbourDiv))
        divsToMerge.push(neighbourDiv);
    return divsToMerge;
}


/***/ }),

/***/ "./src/checkPosition.ts":
/*!******************************!*\
  !*** ./src/checkPosition.ts ***!
  \******************************/
/*! exports provided: checkPosition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkPosition", function() { return checkPosition; });
/* harmony import */ var _updateCoords__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateCoords */ "./src/updateCoords.ts");
/* harmony import */ var _checkNeighbours__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkNeighbours */ "./src/checkNeighbours.ts");
/* harmony import */ var _puzzle_game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./puzzle-game */ "./src/puzzle-game.ts");



function checkPosition(dragElement) {
    var _a;
    var field = document.getElementById('field');
    var tile = _puzzle_game__WEBPACK_IMPORTED_MODULE_2__["puzzlesData"][Number(dragElement.firstElementChild.id)];
    var tilePositionTop = field.offsetTop + field.clientTop + tile.row * 100;
    var tilePositionLeft = field.offsetLeft + field.clientLeft + tile.col * 100;
    var tileCoords = dragElement.firstElementChild.getBoundingClientRect();
    if (+dragElement.style.transform.replace(/\D+/g, '') === 0 &&
        Math.abs(tilePositionTop - tileCoords.top) < 3 &&
        Math.abs(tilePositionLeft - tileCoords.left) < 3) {
        (_a = field).append.apply(_a, [].slice.call(dragElement.children));
        dragElement.remove();
        Object(_updateCoords__WEBPACK_IMPORTED_MODULE_0__["updateCoords"])(field);
        return;
    }
    Object(_checkNeighbours__WEBPACK_IMPORTED_MODULE_1__["checkNeighbours"])(dragElement);
}


/***/ }),

/***/ "./src/combineCells.ts":
/*!*****************************!*\
  !*** ./src/combineCells.ts ***!
  \*****************************/
/*! exports provided: combineCells */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineCells", function() { return combineCells; });
/* harmony import */ var _updateCoords__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateCoords */ "./src/updateCoords.ts");

function combineCells(dragElement, divsToMerge) {
    var _a;
    for (var _i = 0, divsToMerge_1 = divsToMerge; _i < divsToMerge_1.length; _i++) {
        var div = divsToMerge_1[_i];
        var newX = Math.min(parseInt(dragElement.style.left), parseInt(div.style.left));
        var newY = Math.min(parseInt(dragElement.style.top), parseInt(div.style.top));
        (_a = dragElement).append.apply(_a, [].slice.call(div.children));
        dragElement.style.left = newX + "px";
        dragElement.style.top = newY + "px";
        div.remove();
    }
    Object(_updateCoords__WEBPACK_IMPORTED_MODULE_0__["updateCoords"])(dragElement);
}


/***/ }),

/***/ "./src/createTiles.ts":
/*!****************************!*\
  !*** ./src/createTiles.ts ***!
  \****************************/
/*! exports provided: createImg, createTiles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createImg", function() { return createImg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTiles", function() { return createTiles; });
function createImg(rows, cols, id, x, y, degree, img) {
    var coef = 1;
    if (img.width > img.height) {
        coef = img.width / img.height;
    }
    return "<div class=\"draggable\" style=\"transform: rotate(" + degree + "deg);\">\n        <span class=\"img-cell\" id=\"" + id + "\" style=\"\n        background: url(" + img.url + ") no-repeat " + -y * 100 + "px " + -x * 100 + "px;\n        background-size: " + 100 * coef * rows + "%;\n        grid-row: " + (x + 1) + "/" + (x + 2) + "; grid-column: " + (y + 1) + "/" + (y + 2) + ";\"></span>\n        </div>";
}
function createTiles(rows, cols, img) {
    var result = [];
    var id = 0;
    for (var x = 0; x < rows; x++) {
        for (var y = 0; y < cols; y++) {
            var degree = Math.floor(Math.random() * 4) * 90;
            var tile = {
                row: x,
                col: y,
                coords: [{ x: undefined, y: undefined }, { x: undefined, y: undefined }, { x: undefined, y: undefined }, { x: undefined, y: undefined }],
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



/***/ }),

/***/ "./src/insertTiles.ts":
/*!****************************!*\
  !*** ./src/insertTiles.ts ***!
  \****************************/
/*! exports provided: insertTiles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertTiles", function() { return insertTiles; });
function insertTiles(array, container) {
    var insertHtml = '';
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var tile = array_1[_i];
        insertHtml += tile.img;
    }
    container.insertAdjacentHTML('beforeend', insertHtml);
}


/***/ }),

/***/ "./src/puzzle-game.ts":
/*!****************************!*\
  !*** ./src/puzzle-game.ts ***!
  \****************************/
/*! exports provided: puzzlesData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "puzzlesData", function() { return puzzlesData; });
/* harmony import */ var _createTiles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createTiles */ "./src/createTiles.ts");
/* harmony import */ var _shuffleTiles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shuffleTiles */ "./src/shuffleTiles.ts");
/* harmony import */ var _insertTiles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./insertTiles */ "./src/insertTiles.ts");
/* harmony import */ var _updateCoords__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updateCoords */ "./src/updateCoords.ts");
/* harmony import */ var _checkPosition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./checkPosition */ "./src/checkPosition.ts");
// "use strict";





var imgData = {
    width: 0,
    height: 0,
    url: ''
};
var puzzlesData;
var preview = document.getElementById('preview');
var file = document.querySelector('#file');
function clearField() {
    var field = document.getElementById('field');
    field.innerHTML = '';
    var elements = document.getElementsByClassName('draggable');
    while (elements[0]) {
        elements[0].remove();
    }
}
function uploadImageData(url) {
    var image = new Image();
    image.addEventListener('load', function () {
        imgData.width = image.width;
        imgData.height = image.height;
    });
    imgData.url = url;
    image.src = url;
    preview.style.backgroundImage = "url(" + url + ")";
    preview.classList.add('show');
}
file.addEventListener('change', function () {
    if (file.files[0]) {
        clearField();
        uploadImageData(URL.createObjectURL(file.files[0]));
    }
});
var select = document.querySelector('#list');
uploadImageData(select.value);
select.addEventListener('change', function () {
    clearField();
    uploadImageData(select.value);
});
var hint = document.getElementById('hint');
hint.addEventListener('click', function () {
    preview.classList.toggle('show');
});
var start = document.getElementById('start');
start.addEventListener('click', function () {
    if (imgData.url === undefined) {
        alert('Please, choose an image!');
        return;
    }
    clearField();
    preview.classList.remove('show');
    puzzlesData = Object(_createTiles__WEBPACK_IMPORTED_MODULE_0__["createTiles"])(4, 4, imgData);
    var shuffledTiles = Object(_shuffleTiles__WEBPACK_IMPORTED_MODULE_1__["shuffleTiles"])(puzzlesData);
    var container = document.getElementById('image-sliced');
    Object(_insertTiles__WEBPACK_IMPORTED_MODULE_2__["insertTiles"])(shuffledTiles, container);
});
document.addEventListener('mousedown', function (event) {
    if (event.target.className !== 'img-cell')
        return;
    var dragElement = event.target.closest('.draggable');
    if (!dragElement)
        return;
    event.preventDefault();
    var startX, startY, shiftX, shiftY;
    startDrag(event.clientX, event.clientY);
    // remember the initial shift and start position
    // move the element as a direct child of body
    function startDrag(clientX, clientY) {
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
    function onMouseUp(event) {
        document.removeEventListener('mousemove', onMouseMove);
        dragElement.removeEventListener('mouseup', onMouseUp);
        // If position didn't change, treat is as a click
        if (startX === event.clientX &&
            startY === event.clientY)
            onClick(dragElement);
        Object(_updateCoords__WEBPACK_IMPORTED_MODULE_3__["updateCoords"])(dragElement);
        Object(_checkPosition__WEBPACK_IMPORTED_MODULE_4__["checkPosition"])(dragElement);
    }
    function onMouseMove(event) {
        // Remember initial coordinates
        startX = dragElement.getBoundingClientRect().left + shiftX;
        startY = dragElement.getBoundingClientRect().top + shiftY;
        moveAt(event.clientX, event.clientY);
    }
    function moveAt(clientX, clientY) {
        var diffX = clientX - startX;
        var diffY = clientY - startY;
        dragElement.style.left = parseInt(dragElement.style.left) + diffX + 'px';
        dragElement.style.top = parseInt(dragElement.style.top) + diffY + 'px';
    }
});
document.addEventListener('touchstart', function (event) {
    if (event.target.className !== 'img-cell')
        return;
    var dragElement = event.target.closest('.draggable');
    if (!dragElement)
        return;
    event.preventDefault();
    var startX, startY, shiftX, shiftY;
    startDrag(event.touches[0].clientX, event.touches[0].clientY);
    // remember the initial shift and start position
    // move the element as a direct child of body
    function startDrag(clientX, clientY) {
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
        Object(_updateCoords__WEBPACK_IMPORTED_MODULE_3__["updateCoords"])(dragElement);
        Object(_checkPosition__WEBPACK_IMPORTED_MODULE_4__["checkPosition"])(dragElement);
    }
    function onMouseMove(event) {
        // Remember initial coordinates
        startX = dragElement.getBoundingClientRect().left + shiftX;
        startY = dragElement.getBoundingClientRect().top + shiftY;
        moveAt(event.touches[0].clientX, event.touches[0].clientY);
    }
    function moveAt(clientX, clientY) {
        var diffX = clientX - startX;
        var diffY = clientY - startY;
        dragElement.style.left = parseInt(dragElement.style.left) + diffX + 'px';
        dragElement.style.top = parseInt(dragElement.style.top) + diffY + 'px';
    }
});
function onClick(dragElement) {
    // Rotate element by 90 degrees clockwise
    var degree = +dragElement.style.transform.replace(/\D+/g, '') + 90;
    if (degree === 360)
        degree = 0;
    dragElement.style.transform = "rotate(" + degree + "deg)";
    for (var _i = 0, _a = [].slice.call(dragElement.children); _i < _a.length; _i++) {
        var child = _a[_i];
        puzzlesData[child.id].rotation = degree;
    }
}


/***/ }),

/***/ "./src/shuffleTiles.ts":
/*!*****************************!*\
  !*** ./src/shuffleTiles.ts ***!
  \*****************************/
/*! exports provided: shuffleTiles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffleTiles", function() { return shuffleTiles; });
function shuffleTiles(array) {
    var result = array.slice();
    return result.sort(function () { return Math.random() - 0.5; });
}


/***/ }),

/***/ "./src/updateCoords.ts":
/*!*****************************!*\
  !*** ./src/updateCoords.ts ***!
  \*****************************/
/*! exports provided: updateCoords */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCoords", function() { return updateCoords; });
/* harmony import */ var _puzzle_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./puzzle-game */ "./src/puzzle-game.ts");

function updateCoords(element) {
    for (var _i = 0, _a = [].slice.call(element.children); _i < _a.length; _i++) {
        var child = _a[_i];
        var tile = _puzzle_game__WEBPACK_IMPORTED_MODULE_0__["puzzlesData"][child.id];
        var tileDiv = document.getElementById("" + child.id);
        var _b = tileDiv.getBoundingClientRect(), left = _b.left, top_1 = _b.top;
        tile.coords[0] = {
            x: left,
            y: top_1
        };
        tile.coords[1] = {
            x: left + tileDiv.clientWidth,
            y: top_1
        };
        tile.coords[2] = {
            x: left + tileDiv.clientWidth,
            y: top_1 + tileDiv.clientHeight
        };
        tile.coords[3] = {
            x: left,
            y: top_1 + tileDiv.clientHeight
        };
        var degree = tile.rotation;
        while (degree > 0) {
            tile.coords.push(tile.coords.shift());
            degree -= 90;
        }
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NoZWNrTmVpZ2hib3Vycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hlY2tQb3NpdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tYmluZUNlbGxzLnRzIiwid2VicGFjazovLy8uL3NyYy9jcmVhdGVUaWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5zZXJ0VGlsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3B1enpsZS1nYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9zaHVmZmxlVGlsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VwZGF0ZUNvb3Jkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEYwQztBQUNFO0FBR3RDLHlCQUEwQixXQUF3QjtJQUN0RCxJQUFNLFdB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QUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRztZQUNmLENBQUMsRUFBRSxJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVc7WUFDN0IsQ0FBQyxFQUFFLEtBQUc7U0FDUCxDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRztZQUNmLENBQUMsRUFBRSxJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVc7WUFDN0IsQ0FBQyxFQUFFLEtBQUcsR0FBRyxPQUFPLENBQUMsWUFBWTtTQUM5QixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRztZQUNmLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLEtBQUcsR0FBRyxPQUFPLENBQUMsWUFBWTtTQUM5QixDQUFDO1FBRUYsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMzQixPQUFPLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sSUFBSSxFQUFFLENBQUM7U0FDZDtLQUNGO0FBQ0gsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wdXp6bGUtZ2FtZS50c1wiKTtcbiIsImltcG9ydCB7cHV6emxlc0RhdGF9IGZyb20gXCIuL3B1enpsZS1nYW1lXCI7XHJcbmltcG9ydCB7Y29tYmluZUNlbGxzfSBmcm9tIFwiLi9jb21iaW5lQ2VsbHNcIjtcclxuaW1wb3J0IHtwdXp6bGVzRGF0YU1vZGVsfSBmcm9tICcuL3B1enpsZS1nYW1lJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja05laWdoYm91cnMoZHJhZ0VsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgY29uc3QgZGl2c1RvTWVyZ2U6IEFycmF5PEhUTUxFbGVtZW50PiA9IFtdO1xyXG4gIGZvciAobGV0IGNoaWxkIG9mIFtdLnNsaWNlLmNhbGwoZHJhZ0VsZW1lbnQuY2hpbGRyZW4pKSB7XHJcbiAgICBjb25zdCB0aWxlOiBwdXp6bGVzRGF0YU1vZGVsID0gcHV6emxlc0RhdGFbY2hpbGQuaWRdO1xyXG4gICAgbGV0IG5laWdoYm91cjogcHV6emxlc0RhdGFNb2RlbDtcclxuXHJcbiAgICBpZiAodGlsZS5uZWlnaGJvdXJMZWZ0ICE9PSAtMSkge1xyXG4gICAgICBuZWlnaGJvdXIgPSBwdXp6bGVzRGF0YVt0aWxlLm5laWdoYm91ckxlZnRdO1xyXG4gICAgICBpZiAoY2hlY2tDb3JuZXJzKHRpbGUsIDAsIG5laWdoYm91ciwgMSkpIHtcclxuICAgICAgICBhZGREaXZUb01lcmdlKGRpdnNUb01lcmdlLCB0aWxlLm5laWdoYm91ckxlZnQpO1xyXG4gICAgICAgIG5laWdoYm91ci5uZWlnaGJvdXJSaWdodCA9IC0xO1xyXG4gICAgICAgIHRpbGUubmVpZ2hib3VyTGVmdCA9IC0xO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRpbGUubmVpZ2hib3VyUmlnaHQgIT09IC0xKSB7XHJcbiAgICAgIG5laWdoYm91ciA9IHB1enpsZXNEYXRhW3RpbGUubmVpZ2hib3VyUmlnaHRdO1xyXG4gICAgICBpZiAoY2hlY2tDb3JuZXJzKHRpbGUsIDIsIG5laWdoYm91ciwgMykpIHtcclxuICAgICAgICBhZGREaXZUb01lcmdlKGRpdnNUb01lcmdlLCB0aWxlLm5laWdoYm91clJpZ2h0KTtcclxuICAgICAgICBuZWlnaGJvdXIubmVpZ2hib3VyTGVmdCA9IC0xO1xyXG4gICAgICAgIHRpbGUubmVpZ2hib3VyUmlnaHQgPSAtMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aWxlLm5laWdoYm91clRvcCAhPT0gLTEpIHtcclxuICAgICAgbmVpZ2hib3VyID0gcHV6emxlc0RhdGFbdGlsZS5uZWlnaGJvdXJUb3BdO1xyXG4gICAgICBpZiAoY2hlY2tDb3JuZXJzKHRpbGUsIDAsIG5laWdoYm91ciwgMykpIHtcclxuICAgICAgICBhZGREaXZUb01lcmdlKGRpdnNUb01lcmdlLCB0aWxlLm5laWdoYm91clRvcCk7XHJcbiAgICAgICAgbmVpZ2hib3VyLm5laWdoYm91ckJvdHRvbSA9IC0xO1xyXG4gICAgICAgIHRpbGUubmVpZ2hib3VyVG9wID0gLTE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGlsZS5uZWlnaGJvdXJCb3R0b20gIT09IC0xKSB7XHJcbiAgICAgIG5laWdoYm91ciA9IHB1enpsZXNEYXRhW3RpbGUubmVpZ2hib3VyQm90dG9tXTtcclxuICAgICAgaWYgKGNoZWNrQ29ybmVycyh0aWxlLCAyLCBuZWlnaGJvdXIsIDEpKSB7XHJcbiAgICAgICAgYWRkRGl2VG9NZXJnZShkaXZzVG9NZXJnZSwgdGlsZS5uZWlnaGJvdXJCb3R0b20pO1xyXG4gICAgICAgIG5laWdoYm91ci5uZWlnaGJvdXJUb3AgPSAtMTtcclxuICAgICAgICB0aWxlLm5laWdoYm91ckJvdHRvbSA9IC0xO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAoZGl2c1RvTWVyZ2UubGVuZ3RoICE9PSAwKSBjb21iaW5lQ2VsbHMoZHJhZ0VsZW1lbnQsIGRpdnNUb01lcmdlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrQ29ybmVycyAodGlsZTogcHV6emxlc0RhdGFNb2RlbCwgY29ybmVyMTogbnVtYmVyLCBuZWlnaGJvdXI6IHB1enpsZXNEYXRhTW9kZWwsIGNvcm5lcjI6IG51bWJlcil7XHJcbiAgcmV0dXJuIE1hdGguYWJzKHRpbGUuY29vcmRzW2Nvcm5lcjFdLnggLSBuZWlnaGJvdXIuY29vcmRzW2Nvcm5lcjJdLngpIDwgMyAmJlxyXG4gICAgTWF0aC5hYnModGlsZS5jb29yZHNbY29ybmVyMV0ueSAtIG5laWdoYm91ci5jb29yZHNbY29ybmVyMl0ueSkgPCAzICYmXHJcbiAgICB0aWxlLnJvdGF0aW9uID09PSBuZWlnaGJvdXIucm90YXRpb247XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGREaXZUb01lcmdlKGRpdnNUb01lcmdlOiBBcnJheTxIVE1MRWxlbWVudD4sIG5laWdoYm91cjogbnVtYmVyKSB7XHJcbiAgY29uc3QgbmVpZ2hib3VyRGl2ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke25laWdoYm91cn1gKS5wYXJlbnROb2RlO1xyXG4gIGlmICghKDxhbnk+ZGl2c1RvTWVyZ2UpLmluY2x1ZGVzKG5laWdoYm91ckRpdikpIGRpdnNUb01lcmdlLnB1c2gobmVpZ2hib3VyRGl2KTtcclxuICByZXR1cm4gZGl2c1RvTWVyZ2U7XHJcbn0iLCJpbXBvcnQge3VwZGF0ZUNvb3Jkc30gZnJvbSBcIi4vdXBkYXRlQ29vcmRzXCI7XHJcbmltcG9ydCB7Y2hlY2tOZWlnaGJvdXJzfSBmcm9tIFwiLi9jaGVja05laWdoYm91cnNcIjtcclxuaW1wb3J0IHtwdXp6bGVzRGF0YX0gZnJvbSBcIi4vcHV6emxlLWdhbWVcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja1Bvc2l0aW9uKGRyYWdFbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gIGNvbnN0IGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpZWxkJyk7XHJcbiAgY29uc3QgdGlsZSA9IHB1enpsZXNEYXRhW051bWJlcihkcmFnRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC5pZCldO1xyXG4gIGNvbnN0IHRpbGVQb3NpdGlvblRvcCA9IGZpZWxkLm9mZnNldFRvcCArIGZpZWxkLmNsaWVudFRvcCArIHRpbGUucm93ICogMTAwO1xyXG4gIGNvbnN0IHRpbGVQb3NpdGlvbkxlZnQgPSBmaWVsZC5vZmZzZXRMZWZ0ICsgZmllbGQuY2xpZW50TGVmdCArIHRpbGUuY29sICogMTAwO1xyXG4gIGNvbnN0IHRpbGVDb29yZHMgPSBkcmFnRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgaWYgKCtkcmFnRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0ucmVwbGFjZSgvXFxEKy9nLCAnJykgPT09IDAgJiZcclxuICAgIE1hdGguYWJzKHRpbGVQb3NpdGlvblRvcCAtIHRpbGVDb29yZHMudG9wKSA8IDMgJiZcclxuICAgIE1hdGguYWJzKHRpbGVQb3NpdGlvbkxlZnQgLSB0aWxlQ29vcmRzLmxlZnQpIDwgMykge1xyXG4gICAgKDxhbnk+ZmllbGQpLmFwcGVuZCguLi5bXS5zbGljZS5jYWxsKGRyYWdFbGVtZW50LmNoaWxkcmVuKSk7XHJcbiAgICBkcmFnRWxlbWVudC5yZW1vdmUoKTtcclxuICAgIHVwZGF0ZUNvb3JkcyhmaWVsZCk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjaGVja05laWdoYm91cnMoZHJhZ0VsZW1lbnQpO1xyXG59IiwiaW1wb3J0IHt1cGRhdGVDb29yZHN9IGZyb20gXCIuL3VwZGF0ZUNvb3Jkc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVDZWxscyhkcmFnRWxlbWVudDogSFRNTEVsZW1lbnQsIGRpdnNUb01lcmdlOiBBcnJheTxIVE1MRWxlbWVudD4pIHtcclxuICBmb3IgKGxldCBkaXYgb2YgZGl2c1RvTWVyZ2UpIHtcclxuICAgIGNvbnN0IG5ld1ggPSBNYXRoLm1pbihwYXJzZUludChkcmFnRWxlbWVudC5zdHlsZS5sZWZ0KSwgcGFyc2VJbnQoZGl2LnN0eWxlLmxlZnQpKTtcclxuICAgIGNvbnN0IG5ld1kgPSBNYXRoLm1pbihwYXJzZUludChkcmFnRWxlbWVudC5zdHlsZS50b3ApLCBwYXJzZUludChkaXYuc3R5bGUudG9wKSk7XHJcbiAgICAoPGFueT5kcmFnRWxlbWVudCkuYXBwZW5kKC4uLltdLnNsaWNlLmNhbGwoZGl2LmNoaWxkcmVuKSk7XHJcbiAgICBkcmFnRWxlbWVudC5zdHlsZS5sZWZ0ID0gbmV3WCArIFwicHhcIjtcclxuICAgIGRyYWdFbGVtZW50LnN0eWxlLnRvcCA9IG5ld1kgKyBcInB4XCI7XHJcbiAgICBkaXYucmVtb3ZlKCk7XHJcbiAgfVxyXG4gIHVwZGF0ZUNvb3JkcyhkcmFnRWxlbWVudCk7XHJcbn0iLCJpbXBvcnQge2ltZ0RhdGFNb2RlbCwgcHV6emxlc0RhdGFNb2RlbH0gZnJvbSAnLi9wdXp6bGUtZ2FtZSc7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVJbWcocm93czogbnVtYmVyLCBjb2xzOiBudW1iZXIsIGlkOiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyLCBkZWdyZWU6IG51bWJlciwgaW1nOiBpbWdEYXRhTW9kZWwpIHtcclxuICBsZXQgY29lZiA9IDE7XHJcbiAgaWYgKGltZy53aWR0aCA+IGltZy5oZWlnaHQpIHtcclxuICAgIGNvZWYgPSBpbWcud2lkdGggLyBpbWcuaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiZHJhZ2dhYmxlXCIgc3R5bGU9XCJ0cmFuc2Zvcm06IHJvdGF0ZSgke2RlZ3JlZX1kZWcpO1wiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaW1nLWNlbGxcIiBpZD1cIiR7aWR9XCIgc3R5bGU9XCJcclxuICAgICAgICBiYWNrZ3JvdW5kOiB1cmwoJHtpbWcudXJsfSkgbm8tcmVwZWF0ICR7LXkqMTAwfXB4ICR7LXgqMTAwfXB4O1xyXG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogJHsxMDAqY29lZipyb3dzfSU7XHJcbiAgICAgICAgZ3JpZC1yb3c6ICR7eCsxfS8ke3grMn07IGdyaWQtY29sdW1uOiAke3krMX0vJHt5KzJ9O1wiPjwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUaWxlcyhyb3dzOiBudW1iZXIsIGNvbHM6IG51bWJlciwgaW1nOiBpbWdEYXRhTW9kZWwpIHtcclxuICBjb25zdCByZXN1bHQgPSBbXTtcclxuICBsZXQgaWQgPSAwO1xyXG5cclxuICBmb3IgKGxldCB4ID0gMDsgeCA8IHJvd3M7IHgrKykge1xyXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBjb2xzOyB5KyspIHtcclxuICAgICAgY29uc3QgZGVncmVlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNCkgKiA5MDtcclxuICAgICAgY29uc3QgdGlsZTogcHV6emxlc0RhdGFNb2RlbCA9IHtcclxuICAgICAgICByb3c6IHgsXHJcbiAgICAgICAgY29sOiB5LFxyXG4gICAgICAgIGNvb3JkczogW3t4OiB1bmRlZmluZWQsIHk6IHVuZGVmaW5lZH0sIHt4OiB1bmRlZmluZWQsIHk6IHVuZGVmaW5lZH0sIHt4OiB1bmRlZmluZWQsIHk6IHVuZGVmaW5lZH0sIHt4OiB1bmRlZmluZWQsIHk6IHVuZGVmaW5lZH1dLFxyXG4gICAgICAgIHJvdGF0aW9uOiBkZWdyZWUsXHJcbiAgICAgICAgbmVpZ2hib3VyTGVmdDogeSAhPT0gMCA/IGlkIC0gMSA6IC0xLFxyXG4gICAgICAgIG5laWdoYm91clJpZ2h0OiB5ICE9PSBjb2xzIC0gMSA/IGlkICsgMSA6IC0xLFxyXG4gICAgICAgIG5laWdoYm91clRvcDogeCAhPT0gMCA/IGlkIC0gY29scyA6IC0xLFxyXG4gICAgICAgIG5laWdoYm91ckJvdHRvbTogeCAhPT0gcm93cyAtIDEgPyBpZCArIGNvbHMgOiAtMSxcclxuICAgICAgICBpbWc6IGNyZWF0ZUltZyhyb3dzLCBjb2xzLCBpZCwgeCwgeSwgZGVncmVlLCBpbWcpLFxyXG4gICAgICB9O1xyXG4gICAgICBpZCsrO1xyXG4gICAgICByZXN1bHQucHVzaCh0aWxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCB7Y3JlYXRlSW1nLCBjcmVhdGVUaWxlc307IiwiaW1wb3J0IHtwdXp6bGVzRGF0YU1vZGVsfSBmcm9tICcuL3B1enpsZS1nYW1lJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRUaWxlcyhhcnJheTogQXJyYXk8cHV6emxlc0RhdGFNb2RlbD4sIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICBsZXQgaW5zZXJ0SHRtbCA9ICcnO1xyXG4gIGZvciAobGV0IHRpbGUgb2YgYXJyYXkpIHtcclxuICAgIGluc2VydEh0bWwgKz0gdGlsZS5pbWc7XHJcbiAgfVxyXG4gIGNvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGluc2VydEh0bWwpO1xyXG59XHJcbiIsIi8vIFwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHtjcmVhdGVUaWxlc30gZnJvbSAnLi9jcmVhdGVUaWxlcyc7XHJcbmltcG9ydCB7c2h1ZmZsZVRpbGVzfSBmcm9tICcuL3NodWZmbGVUaWxlcyc7XHJcbmltcG9ydCB7aW5zZXJ0VGlsZXN9IGZyb20gJy4vaW5zZXJ0VGlsZXMnO1xyXG5pbXBvcnQge3VwZGF0ZUNvb3Jkc30gZnJvbSAnLi91cGRhdGVDb29yZHMnO1xyXG5pbXBvcnQge2NoZWNrUG9zaXRpb259IGZyb20gJy4vY2hlY2tQb3NpdGlvbic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHB1enpsZXNEYXRhTW9kZWwge1xyXG4gIHJvdzogbnVtYmVyLFxyXG4gIGNvbDogbnVtYmVyLFxyXG4gIGNvb3JkczogQXJyYXk8e3g6IG51bWJlcnx1bmRlZmluZWQsIHk6IG51bWJlcnx1bmRlZmluZWR9PixcclxuICByb3RhdGlvbjogbnVtYmVyLFxyXG4gIG5laWdoYm91ckxlZnQ6IG51bWJlcixcclxuICBuZWlnaGJvdXJSaWdodDogbnVtYmVyLFxyXG4gIG5laWdoYm91clRvcDogbnVtYmVyLFxyXG4gIG5laWdoYm91ckJvdHRvbTogbnVtYmVyLFxyXG4gIGltZzogc3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgaW1nRGF0YU1vZGVsIHtcclxuICB3aWR0aDogbnVtYmVyLFxyXG4gIGhlaWdodDogbnVtYmVyLFxyXG4gIHVybDogc3RyaW5nXHJcbn1cclxuXHJcbmNvbnN0IGltZ0RhdGE6IGltZ0RhdGFNb2RlbCA9IHtcclxuICB3aWR0aDogMCxcclxuICBoZWlnaHQ6IDAsXHJcbiAgdXJsOiAnJ1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBwdXp6bGVzRGF0YTogQXJyYXk8cHV6emxlc0RhdGFNb2RlbD47XHJcblxyXG5jb25zdCBwcmV2aWV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXZpZXcnKTtcclxuY29uc3QgZmlsZTogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlJyk7XHJcblxyXG5mdW5jdGlvbiBjbGVhckZpZWxkKCkge1xyXG4gIGNvbnN0IGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpZWxkJyk7XHJcbiAgZmllbGQuaW5uZXJIVE1MID0gJyc7XHJcbiAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkcmFnZ2FibGUnKTtcclxuICB3aGlsZSAoZWxlbWVudHNbMF0pIHtcclxuICAgIGVsZW1lbnRzWzBdLnJlbW92ZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBsb2FkSW1hZ2VEYXRhKHVybDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaW1nRGF0YS53aWR0aCA9IGltYWdlLndpZHRoO1xyXG4gICAgICAgIGltZ0RhdGEuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xyXG4gICAgfSk7XHJcblxyXG4gICAgaW1nRGF0YS51cmwgPSB1cmw7XHJcbiAgICBpbWFnZS5zcmMgPSB1cmw7XHJcbiAgICBwcmV2aWV3LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHt1cmx9KWA7XHJcbiAgICBwcmV2aWV3LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxufVxyXG5cclxuZmlsZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICBpZiAoZmlsZS5maWxlc1swXSkge1xyXG4gICAgY2xlYXJGaWVsZCgpO1xyXG4gICAgdXBsb2FkSW1hZ2VEYXRhKFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZS5maWxlc1swXSkpO1xyXG4gIH1cclxufSk7XHJcblxyXG5jb25zdCBzZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xpc3QnKTtcclxudXBsb2FkSW1hZ2VEYXRhKHNlbGVjdC52YWx1ZSk7XHJcblxyXG5zZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjbGVhckZpZWxkKCk7XHJcbiAgICB1cGxvYWRJbWFnZURhdGEoc2VsZWN0LnZhbHVlKTtcclxufSk7XHJcblxyXG5jb25zdCBoaW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpbnQnKTtcclxuaGludC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgcHJldmlldy5jbGFzc0xpc3QudG9nZ2xlKCdzaG93Jyk7XHJcbn0pO1xyXG5cclxuY29uc3Qgc3RhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKTtcclxuc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gIGlmIChpbWdEYXRhLnVybCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICBhbGVydCgnUGxlYXNlLCBjaG9vc2UgYW4gaW1hZ2UhJyk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNsZWFyRmllbGQoKTtcclxuICBwcmV2aWV3LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICBwdXp6bGVzRGF0YSA9IGNyZWF0ZVRpbGVzKDQsIDQsIGltZ0RhdGEpO1xyXG4gIGNvbnN0IHNodWZmbGVkVGlsZXM6IEFycmF5PHB1enpsZXNEYXRhTW9kZWw+ID0gc2h1ZmZsZVRpbGVzKHB1enpsZXNEYXRhKTtcclxuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1hZ2Utc2xpY2VkJyk7XHJcbiAgaW5zZXJ0VGlsZXMoc2h1ZmZsZWRUaWxlcywgY29udGFpbmVyKTtcclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuXHJcbiAgaWYgKCg8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KS5jbGFzc05hbWUgIT09ICdpbWctY2VsbCcpIHJldHVybjtcclxuICBjb25zdCBkcmFnRWxlbWVudCA9IDxIVE1MRWxlbWVudD4oPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmRyYWdnYWJsZScpO1xyXG4gIGlmICghZHJhZ0VsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICBsZXQgc3RhcnRYOiBudW1iZXIsIHN0YXJ0WTogbnVtYmVyLCBzaGlmdFg6IG51bWJlciwgc2hpZnRZOiBudW1iZXI7XHJcblxyXG4gIHN0YXJ0RHJhZyhldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcclxuXHJcbiAgLy8gcmVtZW1iZXIgdGhlIGluaXRpYWwgc2hpZnQgYW5kIHN0YXJ0IHBvc2l0aW9uXHJcbiAgLy8gbW92ZSB0aGUgZWxlbWVudCBhcyBhIGRpcmVjdCBjaGlsZCBvZiBib2R5XHJcbiAgZnVuY3Rpb24gc3RhcnREcmFnKGNsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyKSB7XHJcbiAgICBzaGlmdFggPSBjbGllbnRYIC0gZHJhZ0VsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgIHNoaWZ0WSA9IGNsaWVudFkgLSBkcmFnRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcbiAgICBzdGFydFggPSBkcmFnRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgc2hpZnRYO1xyXG4gICAgc3RhcnRZID0gZHJhZ0VsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgc2hpZnRZO1xyXG5cclxuICAgIGlmIChkcmFnRWxlbWVudC5zdHlsZS5wb3NpdGlvbiAhPT0gJ2Fic29sdXRlJykge1xyXG4gICAgICBkcmFnRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgIGRyYWdFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImdyaWRcIjtcclxuICAgICAgZHJhZ0VsZW1lbnQuc3R5bGUubGVmdCA9IGNsaWVudFggLSBzaGlmdFggKyAncHgnO1xyXG4gICAgICBkcmFnRWxlbWVudC5zdHlsZS50b3AgPSBjbGllbnRZIC0gc2hpZnRZICsgJ3B4JztcclxuICAgIH1cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZHJhZ0VsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUpO1xyXG5cclxuICBkcmFnRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZVVwKTtcclxuXHJcbiAgZnVuY3Rpb24gb25Nb3VzZVVwKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcbiAgICBkcmFnRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZVVwKTtcclxuICAgIC8vIElmIHBvc2l0aW9uIGRpZG4ndCBjaGFuZ2UsIHRyZWF0IGlzIGFzIGEgY2xpY2tcclxuICAgIGlmIChzdGFydFggPT09IGV2ZW50LmNsaWVudFggJiZcclxuICAgICAgc3RhcnRZID09PSBldmVudC5jbGllbnRZKSBvbkNsaWNrKGRyYWdFbGVtZW50KTtcclxuICAgIHVwZGF0ZUNvb3JkcyhkcmFnRWxlbWVudCk7XHJcbiAgICBjaGVja1Bvc2l0aW9uKGRyYWdFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG9uTW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAvLyBSZW1lbWJlciBpbml0aWFsIGNvb3JkaW5hdGVzXHJcbiAgICBzdGFydFggPSBkcmFnRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgc2hpZnRYO1xyXG4gICAgc3RhcnRZID0gZHJhZ0VsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgc2hpZnRZO1xyXG4gICAgbW92ZUF0KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gbW92ZUF0KGNsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBkaWZmWCA9IGNsaWVudFggLSBzdGFydFg7XHJcbiAgICBjb25zdCBkaWZmWSA9IGNsaWVudFkgLSBzdGFydFk7XHJcbiAgICBkcmFnRWxlbWVudC5zdHlsZS5sZWZ0ID0gcGFyc2VJbnQoZHJhZ0VsZW1lbnQuc3R5bGUubGVmdCkgKyBkaWZmWCArICdweCc7XHJcbiAgICBkcmFnRWxlbWVudC5zdHlsZS50b3AgPSBwYXJzZUludChkcmFnRWxlbWVudC5zdHlsZS50b3ApICsgZGlmZlkgKyAncHgnO1xyXG4gIH1cclxufSk7XHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudDogVG91Y2hFdmVudCkge1xyXG5cclxuICBpZiAoKDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQpLmNsYXNzTmFtZSAhPT0gJ2ltZy1jZWxsJykgcmV0dXJuO1xyXG4gIGNvbnN0IGRyYWdFbGVtZW50ID0gPEhUTUxFbGVtZW50Pig8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuZHJhZ2dhYmxlJyk7XHJcbiAgaWYgKCFkcmFnRWxlbWVudCkgcmV0dXJuO1xyXG5cclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGxldCBzdGFydFg6IG51bWJlciwgc3RhcnRZOiBudW1iZXIsIHNoaWZ0WDogbnVtYmVyLCBzaGlmdFk6IG51bWJlcjtcclxuXHJcbiAgc3RhcnREcmFnKGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCwgZXZlbnQudG91Y2hlc1swXS5jbGllbnRZKTtcclxuXHJcbiAgLy8gcmVtZW1iZXIgdGhlIGluaXRpYWwgc2hpZnQgYW5kIHN0YXJ0IHBvc2l0aW9uXHJcbiAgLy8gbW92ZSB0aGUgZWxlbWVudCBhcyBhIGRpcmVjdCBjaGlsZCBvZiBib2R5XHJcbiAgZnVuY3Rpb24gc3RhcnREcmFnKGNsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyKSB7XHJcbiAgICBzaGlmdFggPSBjbGllbnRYIC0gZHJhZ0VsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgIHNoaWZ0WSA9IGNsaWVudFkgLSBkcmFnRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcbiAgICBzdGFydFggPSBkcmFnRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgc2hpZnRYO1xyXG4gICAgc3RhcnRZID0gZHJhZ0VsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgc2hpZnRZO1xyXG5cclxuICAgIGlmIChkcmFnRWxlbWVudC5zdHlsZS5wb3NpdGlvbiAhPT0gJ2Fic29sdXRlJykge1xyXG4gICAgICBkcmFnRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgIGRyYWdFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImdyaWRcIjtcclxuICAgICAgZHJhZ0VsZW1lbnQuc3R5bGUubGVmdCA9IGNsaWVudFggLSBzaGlmdFggKyAncHgnO1xyXG4gICAgICBkcmFnRWxlbWVudC5zdHlsZS50b3AgPSBjbGllbnRZIC0gc2hpZnRZICsgJ3B4JztcclxuICAgIH1cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZHJhZ0VsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgb25Nb3VzZU1vdmUpO1xyXG5cclxuICBkcmFnRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG9uTW91c2VVcCk7XHJcblxyXG4gIGZ1bmN0aW9uIG9uTW91c2VVcCgpIHtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG9uTW91c2VNb3ZlKTtcclxuICAgIGRyYWdFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Nb3VzZVVwKTtcclxuICAgIHVwZGF0ZUNvb3JkcyhkcmFnRWxlbWVudCk7XHJcbiAgICBjaGVja1Bvc2l0aW9uKGRyYWdFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG9uTW91c2VNb3ZlKGV2ZW50OiBUb3VjaEV2ZW50KSB7XHJcbiAgICAvLyBSZW1lbWJlciBpbml0aWFsIGNvb3JkaW5hdGVzXHJcbiAgICBzdGFydFggPSBkcmFnRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgc2hpZnRYO1xyXG4gICAgc3RhcnRZID0gZHJhZ0VsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgc2hpZnRZO1xyXG4gICAgbW92ZUF0KGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCwgZXZlbnQudG91Y2hlc1swXS5jbGllbnRZKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG1vdmVBdChjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlcikge1xyXG4gICAgY29uc3QgZGlmZlggPSBjbGllbnRYIC0gc3RhcnRYO1xyXG4gICAgY29uc3QgZGlmZlkgPSBjbGllbnRZIC0gc3RhcnRZO1xyXG4gICAgZHJhZ0VsZW1lbnQuc3R5bGUubGVmdCA9IHBhcnNlSW50KGRyYWdFbGVtZW50LnN0eWxlLmxlZnQpICsgZGlmZlggKyAncHgnO1xyXG4gICAgZHJhZ0VsZW1lbnQuc3R5bGUudG9wID0gcGFyc2VJbnQoZHJhZ0VsZW1lbnQuc3R5bGUudG9wKSArIGRpZmZZICsgJ3B4JztcclxuICB9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gb25DbGljayhkcmFnRWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuICAvLyBSb3RhdGUgZWxlbWVudCBieSA5MCBkZWdyZWVzIGNsb2Nrd2lzZVxyXG4gIGxldCBkZWdyZWUgPSArZHJhZ0VsZW1lbnQuc3R5bGUudHJhbnNmb3JtLnJlcGxhY2UoL1xcRCsvZywgJycpICsgOTA7XHJcbiAgaWYgKGRlZ3JlZSA9PT0gMzYwKSBkZWdyZWUgPSAwO1xyXG4gIGRyYWdFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHtkZWdyZWV9ZGVnKWA7XHJcblxyXG4gIGZvciAobGV0IGNoaWxkIG9mIFtdLnNsaWNlLmNhbGwoZHJhZ0VsZW1lbnQuY2hpbGRyZW4pKSB7XHJcbiAgICBwdXp6bGVzRGF0YVtjaGlsZC5pZF0ucm90YXRpb24gPSBkZWdyZWU7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtwdXp6bGVzRGF0YU1vZGVsfSBmcm9tICcuL3B1enpsZS1nYW1lJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaHVmZmxlVGlsZXMoYXJyYXk6IEFycmF5PHB1enpsZXNEYXRhTW9kZWw+KTogQXJyYXk8cHV6emxlc0RhdGFNb2RlbD4ge1xyXG4gIGNvbnN0IHJlc3VsdCA9IFsuLi5hcnJheV07XHJcbiAgcmV0dXJuIHJlc3VsdC5zb3J0KCgpID0+IE1hdGgucmFuZG9tKCkgLSAwLjUpO1xyXG59IiwiaW1wb3J0IHtwdXp6bGVzRGF0YX0gZnJvbSAnLi9wdXp6bGUtZ2FtZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ29vcmRzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA6IHZvaWQge1xyXG4gIGZvciAobGV0IGNoaWxkIG9mIFtdLnNsaWNlLmNhbGwoZWxlbWVudC5jaGlsZHJlbikpIHtcclxuICAgIGNvbnN0IHRpbGUgPSBwdXp6bGVzRGF0YVtjaGlsZC5pZF07XHJcbiAgICBjb25zdCB0aWxlRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7Y2hpbGQuaWR9YCk7XHJcbiAgICBjb25zdCB7bGVmdCwgdG9wfSA9IHRpbGVEaXYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICB0aWxlLmNvb3Jkc1swXSA9IHtcclxuICAgICAgeDogbGVmdCxcclxuICAgICAgeTogdG9wXHJcbiAgICB9O1xyXG4gICAgdGlsZS5jb29yZHNbMV0gPSB7XHJcbiAgICAgIHg6IGxlZnQgKyB0aWxlRGl2LmNsaWVudFdpZHRoLFxyXG4gICAgICB5OiB0b3BcclxuICAgIH07XHJcbiAgICB0aWxlLmNvb3Jkc1syXSA9IHtcclxuICAgICAgeDogbGVmdCArIHRpbGVEaXYuY2xpZW50V2lkdGgsXHJcbiAgICAgIHk6IHRvcCArIHRpbGVEaXYuY2xpZW50SGVpZ2h0XHJcbiAgICB9O1xyXG4gICAgdGlsZS5jb29yZHNbM10gPSB7XHJcbiAgICAgIHg6IGxlZnQsXHJcbiAgICAgIHk6IHRvcCArIHRpbGVEaXYuY2xpZW50SGVpZ2h0XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBkZWdyZWUgPSB0aWxlLnJvdGF0aW9uO1xyXG4gICAgd2hpbGUgKGRlZ3JlZSA+IDApIHtcclxuICAgICAgdGlsZS5jb29yZHMucHVzaCh0aWxlLmNvb3Jkcy5zaGlmdCgpKTtcclxuICAgICAgZGVncmVlIC09IDkwO1xyXG4gICAgfVxyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=