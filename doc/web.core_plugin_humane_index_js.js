"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkuc"] = self["webpackChunkuc"] || []).push([["core_plugin_humane_index_js"],{

/***/ "./core/plugin/humane/index.js":
/*!*************************************!*\
  !*** ./core/plugin/humane/index.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\n\nconst Humane = require('humane-js');\nrequire(\"!style-loader!css-loader!humane-js/themes/bigbox.css\");\n\nexports.init = pia=> {\n\tHumane.baseCls = 'humane-bigbox';\n\tpia.addTag('notice', hArg=> {\n\t\tHumane.log(hArg.text);\n\t\treturn false;\n\t});\n};\n\n\n//# sourceURL=webpack://uc/./core/plugin/humane/index.js?");

/***/ })

}]);