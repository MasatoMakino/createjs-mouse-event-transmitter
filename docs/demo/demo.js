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

/***/ "./demoSrc/demo.js":
/*!*************************!*\
  !*** ./demoSrc/demo.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ */ \"./esm/index.js\");\n\n\nconst onDomContentsLoaded = () => {\n  //ステージ更新処理\n  const updateStage = () => {\n    stage.update();\n  };\n\n  const upperCanvas = initUpperCanvas();\n  const stage = initUpperStage(upperCanvas);\n  addDummyTexts(stage);\n  const bottomCanvas = initBottomCanvas();\n  const transmitter = new ___WEBPACK_IMPORTED_MODULE_0__.MouseEventTransmitter(stage, bottomCanvas);\n  initBottomCanvasListeners(bottomCanvas);\n  createjs.Ticker.timingMode = createjs.Ticker.RAF;\n  createjs.Ticker.on(\"tick\", updateStage);\n  setCanvasStyle([upperCanvas, bottomCanvas]);\n};\n\nconst initUpperCanvas = () => {\n  return document.getElementById(\"topCanvas\");\n};\n\nconst initBottomCanvas = () => {\n  return document.getElementById(\"bottomCanvas\");\n};\n\nconst initUpperStage = canvas => {\n  const stage = new createjs.Stage(canvas);\n  stage.enableMouseOver();\n  const shape = new createjs.Shape();\n  shape.graphics.beginFill(\"#F0F\").drawRect(0, 0, 128, 128).endFill();\n  shape.x = 400;\n  shape.y = 360;\n  stage.addChild(shape);\n  return stage;\n};\n\nconst addDummyTexts = stage => {\n  for (let i = 0; i < 4; i++) {\n    const text = new createjs.Text(\"hit test : this text not hit mouse events.\", \"32px sans-serif\");\n    text.x = i * 640;\n    text.mouseEnabled = false;\n    stage.addChild(text);\n  }\n};\n\nconst initBottomCanvasListeners = bottomCanvas => {\n  bottomCanvas.addEventListener(\"mousedown\", e => {\n    console.log(e.type);\n  });\n  bottomCanvas.addEventListener(\"mouseup\", e => {\n    console.log(e.type);\n  });\n  bottomCanvas.addEventListener(\"mousemove\", e => {\n    console.log(e.type);\n  });\n  bottomCanvas.addEventListener(\"wheel\", e => {\n    console.log(e.type);\n  });\n};\n\nconst setCanvasStyle = canvasArray => {\n  canvasArray.forEach((canvas, index) => {\n    const style = canvas.style;\n    style.position = \"absolute\";\n    style.top = 0;\n    style.left = 0;\n    style.zIndex = -index;\n  });\n};\n/**\n * DOMContentLoaded以降に初期化処理を実行する\n */\n\n\nif (document.readyState !== \"loading\") {\n  onDomContentsLoaded();\n} else {\n  document.addEventListener(\"DOMContentLoaded\", onDomContentsLoaded);\n}\n\n//# sourceURL=webpack://createjs-mouse-event-transmitter/./demoSrc/demo.js?");

/***/ }),

/***/ "./esm/MouseEventTransmitter.js":
/*!**************************************!*\
  !*** ./esm/MouseEventTransmitter.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MouseEventTransmitter\": () => (/* binding */ MouseEventTransmitter)\n/* harmony export */ });\nvar Ticker = createjs.Ticker;\n/**\n * createjsのcanvasに対するMouseEventを下層に透過させるクラス。\n * stage上にマウスターゲットが存在しない場合、下層のDomElementにMouseEventを透過する。\n */\n\nclass MouseEventTransmitter {\n  /**\n   * 初期化処理\n   * @param {createjs.Stage} stage createjsのstageオブジェクト\n   * @param {HTMLElement} transmitTarget MouseEventの透過先domElement\n   */\n  constructor(stage, transmitTarget) {\n    this.isDragging = false;\n    this.isDraggingTransmitTarget = false;\n    this.isThrottling = false;\n    /**\n     * このフレーム数毎にmouseMoveのヒット処理が行われる。\n     * 例えば2を指定した場合は、1フレームスキップ、1フレーム処理...の順になる。\n     * 1を指定した場合は毎フレーム処理が行われる。\n     * 1以上の整数であること。\n     */\n\n    this.skipMouseMovePerFrame = 2;\n    this.mouseMoveCounter = 0;\n    /**\n     * wheelイベントを透過する。\n     * stageにヒットした場合は伝播が止まる。\n     * @param e\n     */\n\n    this.onWheelEvent = e => {\n      const isHit = this.hitTestStage(e); //カンバスにヒットしなければ伝播。\n\n      if (isHit) return;\n      const cloneEvent = new WheelEvent(e.type, e);\n      this.transmitTarget.dispatchEvent(cloneEvent);\n    };\n    /**\n     * wheelイベントを透過する。\n     * stageにヒットした場合は伝播が止まる。\n     * @param e\n     */\n\n\n    this.onMouseDown = e => {\n      const isHit = this.hitTestStage(e);\n      this.isDragging = true;\n      this.isDraggingTransmitTarget = !isHit; //カンバスにヒットしなければ伝播。\n\n      if (isHit) return;\n      const cloneEvent = new MouseEvent(e.type, e);\n      this.transmitTarget.dispatchEvent(cloneEvent);\n    };\n    /**\n     * mouseupおよびmouseleaveイベントを透過する。\n     * この二つのイベントはstageへのヒットにかかわらず、必ず伝播される。\n     * @param e\n     */\n\n\n    this.onMouseUpLeave = e => {\n      const cloneEvent = new MouseEvent(e.type, e);\n      this.transmitTarget.dispatchEvent(cloneEvent);\n      this.isDragging = false;\n      this.isDraggingTransmitTarget = false;\n    };\n    /**\n     * mousemoveイベントを透過する。\n     * stage上からドラッグが開始された場合、イベントは伝播されない。\n     * 下層のDOMからドラッグが開始された場合、stage上にポインタがかかってもイベントの伝播を継続する。\n     * @param e\n     */\n\n\n    this.onMouseMove = e => {\n      //連続実行の絞り込み中は処理を中断。\n      if (this.isThrottling) {\n        return;\n      } //createjsのステージ上をドラッグ中の場合、moveイベントは伝播しない。\n\n\n      if (this.isDragging && !this.isDraggingTransmitTarget) {\n        return;\n      }\n\n      this.isThrottling = true; //Transmitterターゲット上をドラッグ中の場合、必ずイベントを伝播\n\n      const cloneEvent = new MouseEvent(e.type, e);\n\n      if (this.isDraggingTransmitTarget) {\n        this.transmitTarget.dispatchEvent(cloneEvent);\n        return;\n      } //ドラッグ中でない場合は、間引き処理をしながらイベントを上げる\n\n\n      this.onMouseMoveNonDragging(e);\n    };\n\n    this.stage = stage;\n    this.transmitTarget = transmitTarget; // @ts-ignore\n\n    if (stage._mouseOverIntervalID == null) {\n      console.warn(\"指定されたstageでドラッグ操作が無効です。\" + \"stage.enableMouseOver()関数を実行してドラッグ操作を有効にしてください。\");\n    }\n\n    this.start();\n    Ticker.addEventListener(\"tick\", () => {\n      this.mouseMoveCounter++;\n      this.mouseMoveCounter %= this.skipMouseMovePerFrame;\n      this.isThrottling = false;\n    });\n  }\n\n  start() {\n    if (this.isListen) return;\n    const canvas = this.stage.canvas;\n    canvas.addEventListener(\"mousemove\", this.onMouseMove, false);\n    canvas.addEventListener(\"mousedown\", this.onMouseDown, false);\n    canvas.addEventListener(\"mouseup\", this.onMouseUpLeave, false);\n    canvas.addEventListener(\"mouseleave\", this.onMouseUpLeave, false);\n    canvas.addEventListener(\"wheel\", this.onWheelEvent, false);\n    this.isListen = true;\n  }\n\n  stop() {\n    if (!this.isListen) return;\n    const canvas = this.stage.canvas;\n    canvas.removeEventListener(\"mousemove\", this.onMouseMove);\n    canvas.removeEventListener(\"mousedown\", this.onMouseDown);\n    canvas.removeEventListener(\"mouseup\", this.onMouseUpLeave);\n    canvas.removeEventListener(\"mouseleave\", this.onMouseUpLeave);\n    canvas.removeEventListener(\"wheel\", this.onWheelEvent);\n    this.isListen = false;\n  }\n  /**\n   * 全てのイベントリスナーを破棄する。\n   */\n\n\n  dispose() {\n    this.stop();\n    this.stage = null;\n    this.transmitTarget = null;\n  }\n  /**\n   * ステージに対する当たり判定を行う。\n   * @param e\n   */\n\n\n  hitTestStage(e) {\n    const obj = this.stage.getObjectUnderPoint(e.offsetX, e.offsetY, 1);\n    return obj != null;\n  }\n\n  onMouseMoveNonDragging(e) {\n    if (this.mouseMoveCounter !== 0) {\n      return;\n    } //ドラッグ中ではない場合、stageにヒットしたら処理中断\n\n\n    const isHit = this.hitTestStage(e);\n    if (isHit) return;\n    const cloneEvent = new MouseEvent(e.type, e);\n    this.transmitTarget.dispatchEvent(cloneEvent);\n  }\n\n}\n\n//# sourceURL=webpack://createjs-mouse-event-transmitter/./esm/MouseEventTransmitter.js?");

/***/ }),

/***/ "./esm/index.js":
/*!**********************!*\
  !*** ./esm/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MouseEventTransmitter\": () => (/* reexport safe */ _MouseEventTransmitter__WEBPACK_IMPORTED_MODULE_0__.MouseEventTransmitter)\n/* harmony export */ });\n/* harmony import */ var _MouseEventTransmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MouseEventTransmitter */ \"./esm/MouseEventTransmitter.js\");\n\n\n//# sourceURL=webpack://createjs-mouse-event-transmitter/./esm/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./demoSrc/demo.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;