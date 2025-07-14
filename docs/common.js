"use strict";
(self["webpackChunkABAAssistant"] = self["webpackChunkABAAssistant"] || []).push([["common"],{

/***/ 42856:
/*!***************************************************!*\
  !*** ./src/shared/animations/routerTransition.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   accountModuleAnimation: () => (/* binding */ accountModuleAnimation),
/* harmony export */   appModuleAnimation: () => (/* binding */ appModuleAnimation),
/* harmony export */   slideFromBottom: () => (/* binding */ slideFromBottom),
/* harmony export */   slideFromUp: () => (/* binding */ slideFromUp)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ 47172);

function appModuleAnimation() {
  return slideFromBottom();
}
function accountModuleAnimation() {
  return slideFromUp();
}
function slideFromBottom() {
  return (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('routerTransition', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('void', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
    'padding-top': '20px',
    opacity: '0'
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
    'padding-top': '0px',
    opacity: '1'
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)(':enter', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('0.33s ease-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
    opacity: '1',
    'padding-top': '0px'
  }))])]);
}
function slideFromUp() {
  return (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('routerTransition', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('void', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
    'margin-top': '10px',
    opacity: '0'
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
    'margin-top': '0px',
    opacity: '1'
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)(':enter', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('0.3s ease-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
    opacity: '1',
    'margin-top': '0px'
  }))])]);
}

/***/ })

}]);
//# sourceMappingURL=common.js.map