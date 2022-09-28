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

/***/ "./client/client.js":
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
/***/ (() => {

eval("const displayCards = async (response, results) => {\r\n\r\n    const json = await response.json();\r\n    const cards = json.data;\r\n    \r\n    for (let i = 0; i < 20 && i < cards.length; i += 1) {\r\n        results.innerHTML += cards[i].name + '<br>';\r\n    }\r\n    results.innerHTML += '</p>';\r\n};\r\n\r\nconst searchCard = async (cardName, results) => {\r\n    const YGOPRO_URL = \"https://db.ygoprodeck.com/api/v7/cardinfo.php?\";\r\n    let url = YGOPRO_URL;\r\n\r\n    let term = \"\";\r\n    if (cardName.value) {\r\n        term = cardName.value.trim();\r\n        term = encodeURIComponent(term);\r\n    }\r\n    url += `fname=${term}`;\r\n\r\n    const response = await fetch(url);\r\n\r\n    displayCards(response, results);\r\n};\r\n\r\nconst init = () => {\r\n    const cardName = document.querySelector('#name-field');\r\n    const searchButton = document.querySelector('#search-button');\r\n    const results = document.querySelector('#results');\r\n\r\n    searchButton.addEventListener('click', () => {\r\n        results.innerHTML = '<p>';\r\n        searchCard(cardName, results);\r\n    });\r\n};\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://igme-430-project-1/./client/client.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client/client.js"]();
/******/ 	
/******/ })()
;