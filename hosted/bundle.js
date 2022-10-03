/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/addCard.js":
/*!***************************!*\
  !*** ./client/addCard.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ \"./client/storage.js\");\n/* harmony import */ var _client_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client.js */ \"./client/client.js\");\n\r\n\r\n\r\nconst template = document.createElement('template');\r\ntemplate.innerHTML = `\r\n<style>\r\ndiv {\r\n    width: 300px;\r\n    border-radius: 0.2em;\r\n    background-color: #f4f4f4;\r\n}\r\np, button {\r\n    margin: 0.5em 1em;\r\n}\r\n</style>\r\n<div>\r\n<p id='p1'></p>\r\n<button id=\"main-button\">Add to Main/Extra Deck</button>\r\n<p id='p2'></p>\r\n</div>\r\n`;\r\n\r\nclass AddCard extends HTMLElement {\r\n    constructor() {\r\n        super();\r\n        this.attachShadow({ mode: \"open\" });\r\n        this.shadowRoot.appendChild(template.content.cloneNode(true));\r\n    }\r\n\r\n    connectedCallback() {\r\n        this.mainButton = this.shadowRoot.querySelector('#main-button');\r\n        this.p1 = this.shadowRoot.querySelector('#p1');\r\n        this.p2 = this.shadowRoot.querySelector('#p2');\r\n\r\n        this.mainButton.addEventListener('click', () => {\r\n            const success = _storage_js__WEBPACK_IMPORTED_MODULE_0__.addCard(this.getAttribute('data-name'));\r\n            if (success) {\r\n                this.p2.innerHTML = 'Added to deck';\r\n            } else {\r\n                this.p2.innerHTML = 'Already at max copies';\r\n            }\r\n            _client_js__WEBPACK_IMPORTED_MODULE_1__.displayDeck();\r\n        });\r\n\r\n        this.render();\r\n    }\r\n\r\n    render() {\r\n        this.p1.innerHTML = this.getAttribute('data-name');\r\n    }\r\n}\r\n\r\ncustomElements.define('add-card', AddCard);\n\n//# sourceURL=webpack://igme-430-project-1/./client/addCard.js?");

/***/ }),

/***/ "./client/client.js":
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"displayDeck\": () => (/* binding */ displayDeck)\n/* harmony export */ });\n/* harmony import */ var _addCard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addCard.js */ \"./client/addCard.js\");\n/* harmony import */ var _displayCard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayCard.js */ \"./client/displayCard.js\");\n/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage.js */ \"./client/storage.js\");\n\r\n\r\n\r\n\r\nconst handleResponse = async (response, method) => {\r\n    const content = document.querySelector('#response');\r\n    const loadForm = document.querySelector('#load-form');\r\n    const name = loadForm.querySelector('#load-name').value;\r\n\r\n    switch (response.status) {\r\n        case 200:\r\n            content.innerHTML = '<b>Success</b>';\r\n            break;\r\n        case 201:\r\n            content.innerHTML = '<b>Created</b>';\r\n            break;\r\n        case 204:\r\n            content.innerHTML = '<b>Updated (No Content)</b>';\r\n            return;\r\n        case 400:\r\n            content.innerHTML = '<b>Bad Request</b>';\r\n            break;\r\n        default:\r\n            content.innerHTML = '<b>Not Found</b>';\r\n            break;\r\n    }\r\n\r\n    if (method === 'get') {\r\n        const json = await response.json();\r\n        if (json.decks[name]) {\r\n            _storage_js__WEBPACK_IMPORTED_MODULE_2__.setDeck(json.decks[name]);\r\n        }\r\n    }\r\n    \r\n    displayDeck();\r\n}\r\n\r\nconst sendPost = async (addForm) => {\r\n    const url = addForm.getAttribute('action');\r\n    const method = addForm.getAttribute('method');\r\n    const name = addForm.querySelector('#add-name').value;\r\n\r\n    let deck = '';\r\n    for (let k of Object.keys(_storage_js__WEBPACK_IMPORTED_MODULE_2__.getDeck())) {\r\n        for (let i = 0; i < _storage_js__WEBPACK_IMPORTED_MODULE_2__.getDeck()[k].count; i += 1) {\r\n            deck += `${_storage_js__WEBPACK_IMPORTED_MODULE_2__.getDeck()[k].name}|`;\r\n        }\r\n    }\r\n\r\n    const formData = `name=${name}&deck=${deck}`;\r\n\r\n    const response = await fetch(url, {\r\n        method,\r\n        headers: {\r\n            'Accept': 'application/json',\r\n            'Content-Type': 'application/x-www-form-urlencoded',\r\n        },\r\n        body: formData,\r\n    });\r\n\r\n    handleResponse(response, method);\r\n};\r\n\r\nconst requestUpdate = async (loadForm) => {\r\n    let url = loadForm.getAttribute('action');\r\n    const method = loadForm.getAttribute('method');\r\n\r\n    const response = await fetch(url, {\r\n        method,\r\n        headers: {\r\n            'Accept': 'application/json',\r\n        },\r\n    });\r\n\r\n    handleResponse(response, method);\r\n}\r\n\r\nconst displayDeck = () => {\r\n    const deck = document.querySelector('#deck');\r\n   \r\n    deck.innerHTML = '<p>';\r\n    for (let k of Object.keys(_storage_js__WEBPACK_IMPORTED_MODULE_2__.getDeck())) {\r\n        const card = document.createElement('display-card');\r\n        card.dataset.name = _storage_js__WEBPACK_IMPORTED_MODULE_2__.getDeck()[k].name;\r\n        card.dataset.count = _storage_js__WEBPACK_IMPORTED_MODULE_2__.getDeck()[k].count;\r\n        deck.appendChild(card);\r\n    }\r\n    deck.innerHTML += '</p>';\r\n};\r\n\r\nconst displayCards = async (response) => {\r\n    const results = document.querySelector('#results');\r\n\r\n    const json = await response.json();\r\n    if (!json.data) {\r\n        results.innerHTML = \"No cards found.\";\r\n    } else {\r\n        const cards = json.data;\r\n\r\n        results.innerHTML = \"\";\r\n        for (let i = 0; i < 20 && i < cards.length; i += 1) {\r\n            const card = document.createElement('add-card');\r\n            card.dataset.name = cards[i].name;\r\n            results.appendChild(card);\r\n        }\r\n    }\r\n};\r\n\r\nconst searchCard = async (cardName) => {\r\n    const YGOPRO_URL = \"https://db.ygoprodeck.com/api/v7/cardinfo.php?\";\r\n    let url = YGOPRO_URL;\r\n\r\n    let term = \"\";\r\n    if (cardName.value) {\r\n        term = cardName.value.trim();\r\n        term = encodeURIComponent(term);\r\n    }\r\n    url += `fname=${term}`;\r\n\r\n    const response = await fetch(url);\r\n\r\n    displayCards(response);\r\n};\r\n\r\nconst init = () => {\r\n    const addForm = document.querySelector('#add-form');\r\n    const loadForm = document.querySelector('#load-form');\r\n    const searchButton = document.querySelector('#search-button');\r\n    const cardName = document.querySelector('#card-name');\r\n\r\n    addForm.addEventListener('submit', (e) => {\r\n        e.preventDefault();\r\n        sendPost(addForm);\r\n        return false;\r\n    });\r\n    loadForm.addEventListener('submit', (e) => {\r\n        e.preventDefault();\r\n        requestUpdate(loadForm);\r\n        return false;\r\n    });\r\n    searchButton.addEventListener('click', () => {\r\n        searchCard(cardName);\r\n    });\r\n};\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://igme-430-project-1/./client/client.js?");

/***/ }),

/***/ "./client/displayCard.js":
/*!*******************************!*\
  !*** ./client/displayCard.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ \"./client/storage.js\");\n/* harmony import */ var _client_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client.js */ \"./client/client.js\");\n\r\n\r\n\r\nconst template = document.createElement('template');\r\ntemplate.innerHTML = `\r\n<style>\r\ndiv {\r\n    width: 300px;\r\n    border-radius: 0.2em;\r\n    background-color: #f4f4f4;\r\n}\r\np, button {\r\n    margin: 0.5em 1em;\r\n}\r\n</style>\r\n<div>\r\n<p></p>\r\n<button id=\"remove-button\">Remove card</button>\r\n</div>\r\n`;\r\n\r\nclass DisplayCard extends HTMLElement {\r\n    constructor() {\r\n        super();\r\n        this.attachShadow({ mode: \"open\" });\r\n        this.shadowRoot.appendChild(template.content.cloneNode(true));\r\n    }\r\n\r\n    connectedCallback() {\r\n        this.removeButton = this.shadowRoot.querySelector('#remove-button');\r\n        this.p = this.shadowRoot.querySelector('p');\r\n\r\n        this.removeButton.addEventListener('click', () => {\r\n            _storage_js__WEBPACK_IMPORTED_MODULE_0__.removeCard(this.getAttribute('data-name'));\r\n            _client_js__WEBPACK_IMPORTED_MODULE_1__.displayDeck();\r\n        });\r\n\r\n        this.render();\r\n    }\r\n\r\n    render() {\r\n        this.p.innerHTML = `Name: ${this.getAttribute('data-name')}<br>Count: ${this.getAttribute('data-count')}`;\r\n    }\r\n}\r\n\r\ncustomElements.define('display-card', DisplayCard);\n\n//# sourceURL=webpack://igme-430-project-1/./client/displayCard.js?");

/***/ }),

/***/ "./client/storage.js":
/*!***************************!*\
  !*** ./client/storage.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addCard\": () => (/* binding */ addCard),\n/* harmony export */   \"getDeck\": () => (/* binding */ getDeck),\n/* harmony export */   \"removeCard\": () => (/* binding */ removeCard),\n/* harmony export */   \"setDeck\": () => (/* binding */ setDeck)\n/* harmony export */ });\nlet deck = {};\r\n\r\nconst addCard = (name) => {\r\n    if (!deck[name]) {\r\n        deck[name] = {};\r\n        deck[name].name = name;\r\n        deck[name].count = 1;\r\n    } else {\r\n        if (deck[name].count === 3) {\r\n            return false;\r\n        }\r\n        deck[name].count += 1;\r\n    }\r\n    return true;\r\n};\r\n\r\nconst removeCard = (name) => {\r\n    if (deck[name]) {\r\n        delete deck[name];\r\n    }\r\n}\r\n\r\nconst getDeck = () => {\r\n    return deck;\r\n};\r\n\r\nconst setDeck = (newDeck) => {\r\n    deck = {};\r\n    for (let k of Object.keys(newDeck)) {\r\n        deck[k] = {};\r\n        deck[k].name = k;\r\n        deck[k].count = newDeck[k];\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://igme-430-project-1/./client/storage.js?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./client/client.js");
/******/ 	
/******/ })()
;