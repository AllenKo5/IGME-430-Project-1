/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/addCard.js":
/*!***************************!*\
  !*** ./client/addCard.js ***!
  \***************************/
/***/ (() => {

eval("const template = document.createElement('template');\r\ntemplate.innerHTML = `\r\n<style>\r\ndiv {\r\n    width: 500px;\r\n    border-radius: 0.2em;\r\n    background-color: #f4f4f4;\r\n}\r\np, button {\r\n    margin: 0.5em 1em;\r\n}\r\n</style>\r\n<div>\r\n<p></p>\r\n<button id=\"main-button\">Add to Main/Extra Deck</button>\r\n<button id=\"side-button\">Add to Side Deck</button>\r\n</div>\r\n`;\r\n\r\nclass AddCard extends HTMLElement {\r\n    constructor() {\r\n        super();\r\n        this.attachShadow({ mode: \"open\" });\r\n        this.shadowRoot.appendChild(template.content.cloneNode(true));\r\n    }\r\n\r\n    connectedCallback() {\r\n        this.mainButton = this.shadowRoot.querySelector('#main-button');\r\n        this.sideButton = this.shadowRoot.querySelector('#side-button');\r\n        this.p = this.shadowRoot.querySelector('p');\r\n\r\n        this.mainButton.addEventListener('click', () => {\r\n\r\n        });\r\n        this.sideButton.addEventListener('click', () => {\r\n\r\n        });\r\n\r\n        this.render();\r\n    }\r\n\r\n    render() {\r\n        this.p.innerHTML = this.getAttribute('data-name');\r\n    }\r\n}\r\n\r\ncustomElements.define('add-card', AddCard);\n\n//# sourceURL=webpack://igme-430-project-1/./client/addCard.js?");

/***/ }),

/***/ "./client/client.js":
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _addCard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addCard.js */ \"./client/addCard.js\");\n/* harmony import */ var _addCard_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_addCard_js__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst createCard = (cardInfo) => {\r\n    const results = document.querySelector('#results');\r\n    const card = document.createElement('add-card');\r\n\r\n    card.dataset.name = cardInfo.name;\r\n\r\n    results.appendChild(card);\r\n};\r\n\r\nconst displayCards = async (response) => {\r\n    const results = document.querySelector('#results');\r\n\r\n    const json = await response.json();\r\n    const cards = json.data;\r\n    \r\n    for (let i = 0; i < 20 && i < cards.length; i += 1) {\r\n        createCard(cards[i]);\r\n    }\r\n    results.innerHTML += '</p>';\r\n};\r\n\r\nconst searchCard = async (cardName) => {\r\n    const YGOPRO_URL = \"https://db.ygoprodeck.com/api/v7/cardinfo.php?\";\r\n    let url = YGOPRO_URL;\r\n\r\n    let term = \"\";\r\n    if (cardName.value) {\r\n        term = cardName.value.trim();\r\n        term = encodeURIComponent(term);\r\n    }\r\n    url += `fname=${term}`;\r\n\r\n    const response = await fetch(url);\r\n\r\n    displayCards(response);\r\n};\r\n\r\nconst init = () => {\r\n    const cardName = document.querySelector('#name-field');\r\n    const searchButton = document.querySelector('#search-button');\r\n    const results = document.querySelector('#results');\r\n\r\n    searchButton.addEventListener('click', () => {\r\n        results.innerHTML = '<p>';\r\n        searchCard(cardName);\r\n    });\r\n};\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://igme-430-project-1/./client/client.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/client.js");
/******/ 	
/******/ })()
;