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
/******/ 	return __webpack_require__(__webpack_require__.s = "./demoSrc/demo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demoSrc/demo.js":
/*!*************************!*\
  !*** ./demoSrc/demo.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ */ \"./esm/index.js\");\n\n\nconst onDomContentsLoaded = () => {\n  //ステージ更新処理\n  const updateStage = () => {\n    stage.update();\n  };\n\n  const canvas = document.getElementById(\"topCanvas\");\n  const stage = new createjs.Stage(canvas);\n  stage.enableMouseOver();\n  const shape = new createjs.Shape();\n  shape.graphics.beginFill(\"#F0F\").drawRect(0, 0, 128, 128).endFill();\n  shape.x = 400;\n  shape.y = 360;\n  stage.addChild(shape);\n\n  for (let i = 0; i < 4; i++) {\n    const text = new createjs.Text(\"hit test : this text not hit mouse events.\", \"32px sans-serif\");\n    text.x = i * 640;\n    text.mouseEnabled = false;\n    stage.addChild(text);\n  }\n\n  const bottomCanvas = document.getElementById(\"bottomCanvas\");\n  const transmitter = new ___WEBPACK_IMPORTED_MODULE_0__[\"MouseEventTransmitter\"](stage, bottomCanvas);\n  console.log(transmitter);\n  bottomCanvas.addEventListener(\"mousedown\", e => {\n    console.log(e.type);\n  });\n  bottomCanvas.addEventListener(\"mouseup\", e => {\n    console.log(e.type);\n  });\n  bottomCanvas.addEventListener(\"mousemove\", e => {\n    console.log(e.type);\n  });\n  bottomCanvas.addEventListener(\"wheel\", e => {\n    console.log(e.type);\n  });\n  createjs.Ticker.timingMode = createjs.Ticker.RAF;\n  createjs.Ticker.on(\"tick\", updateStage);\n  const canvasArray = [canvas, bottomCanvas];\n  canvasArray.forEach((canvas, index) => {\n    const style = canvas.style;\n    style.position = \"absolute\";\n    style.top = 0;\n    style.left = 0;\n    style.zIndex = -index;\n  });\n};\n/**\n * DOMContentLoaded以降に初期化処理を実行する\n */\n\n\nif (document.readyState !== \"loading\") {\n  onDomContentsLoaded();\n} else {\n  document.addEventListener(\"DOMContentLoaded\", onDomContentsLoaded);\n}\n\n//# sourceURL=webpack:///./demoSrc/demo.js?");

/***/ }),

/***/ "./esm/MouseEventTransmitter.js":
/*!**************************************!*\
  !*** ./esm/MouseEventTransmitter.js ***!
  \**************************************/
/*! exports provided: MouseEventTransmitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MouseEventTransmitter\", function() { return MouseEventTransmitter; });\nvar Ticker = createjs.Ticker;\n/**\n * createjsのcanvasに対するMouseEventを下層に透過させるクラス。\n * stage上にマウスターゲットが存在しない場合、下層のDomElementにMouseEventを透過する。\n */\n\nclass MouseEventTransmitter {\n  /**\n   * 初期化処理\n   * @param {createjs.Stage} stage createjsのstageオブジェクト\n   * @param {HTMLElement} transmitTarget MouseEventの透過先domElement\n   */\n  constructor(stage, transmitTarget) {\n    this.isDragging = false;\n    this.isDraggingTransmitTarget = false;\n    this.isThrottling = false;\n    /**\n     * このフレーム数毎にmouseMoveのヒット処理が行われる。\n     * 例えば2を指定した場合は、1フレームスキップ、1フレーム処理...の順になる。\n     * 1を指定した場合は毎フレーム処理が行われる。\n     * 1以上の整数であること。\n     */\n\n    this.skipMouseMovePerFrame = 2;\n    this.mouseMoveCounter = 0;\n    /**\n     * wheelイベントを透過する。\n     * stageにヒットした場合は伝播が止まる。\n     * @param e\n     */\n\n    this.onWheelEvent = e => {\n      const isHit = this.hitTestStage(e); //カンバスにヒットしなければ伝播。\n\n      if (isHit) return;\n      const cloneEvent = new WheelEvent(e.type, e);\n      this.transmitTarget.dispatchEvent(cloneEvent);\n    };\n    /**\n     * wheelイベントを透過する。\n     * stageにヒットした場合は伝播が止まる。\n     * @param e\n     */\n\n\n    this.onMouseDown = e => {\n      const isHit = this.hitTestStage(e);\n      this.isDragging = true;\n      this.isDraggingTransmitTarget = !isHit; //カンバスにヒットしなければ伝播。\n\n      if (isHit) return;\n      const cloneEvent = new MouseEvent(e.type, e);\n      this.transmitTarget.dispatchEvent(cloneEvent);\n    };\n    /**\n     * mouseupおよびmouseleaveイベントを透過する。\n     * この二つのイベントはstageへのヒットにかかわらず、必ず伝播される。\n     * @param e\n     */\n\n\n    this.onMouseUpLeave = e => {\n      const cloneEvent = new MouseEvent(e.type, e);\n      this.transmitTarget.dispatchEvent(cloneEvent);\n      this.isDragging = false;\n      this.isDraggingTransmitTarget = false;\n    };\n    /**\n     * mousemoveイベントを透過する。\n     * stage上からドラッグが開始された場合、イベントは伝播されない。\n     * 下層のDOMからドラッグが開始された場合、stage上にポインタがかかってもイベントの伝播を継続する。\n     * @param e\n     */\n\n\n    this.onMouseMove = e => {\n      //連続実行の絞り込み中は処理を中断。\n      if (this.isThrottling) {\n        return;\n      } //createjsのステージ上をドラッグ中の場合、moveイベントは伝播しない。\n\n\n      if (this.isDragging && !this.isDraggingTransmitTarget) {\n        return;\n      }\n\n      this.isThrottling = true; //Transmitterターゲット上をドラッグ中の場合、必ずイベントを伝播\n\n      const cloneEvent = new MouseEvent(e.type, e);\n\n      if (this.isDraggingTransmitTarget) {\n        this.transmitTarget.dispatchEvent(cloneEvent);\n        return;\n      } //ドラッグ中でない場合は、間引き処理をしながらイベントを上げる\n\n\n      this.onMouseMoveNonDragging(e);\n    };\n\n    this.stage = stage;\n    this.transmitTarget = transmitTarget; // @ts-ignore\n\n    if (stage._mouseOverIntervalID == null) {\n      console.warn(\"指定されたstageでドラッグ操作が無効です。\" + \"stage.enableMouseOver()関数を実行してドラッグ操作を有効にしてください。\");\n    }\n\n    this.start();\n    Ticker.addEventListener(\"tick\", () => {\n      this.mouseMoveCounter++;\n      this.mouseMoveCounter %= this.skipMouseMovePerFrame;\n      this.isThrottling = false;\n    });\n  }\n\n  start() {\n    if (this.isListen) return;\n    const canvas = this.stage.canvas;\n    canvas.addEventListener(\"mousemove\", this.onMouseMove, false);\n    canvas.addEventListener(\"mousedown\", this.onMouseDown, false);\n    canvas.addEventListener(\"mouseup\", this.onMouseUpLeave, false);\n    canvas.addEventListener(\"mouseleave\", this.onMouseUpLeave, false);\n    canvas.addEventListener(\"wheel\", this.onWheelEvent, false);\n    this.isListen = true;\n  }\n\n  stop() {\n    if (!this.isListen) return;\n    const canvas = this.stage.canvas;\n    canvas.removeEventListener(\"mousemove\", this.onMouseMove);\n    canvas.removeEventListener(\"mousedown\", this.onMouseDown);\n    canvas.removeEventListener(\"mouseup\", this.onMouseUpLeave);\n    canvas.removeEventListener(\"mouseleave\", this.onMouseUpLeave);\n    canvas.removeEventListener(\"wheel\", this.onWheelEvent);\n    this.isListen = false;\n  }\n  /**\n   * 全てのイベントリスナーを破棄する。\n   */\n\n\n  dispose() {\n    this.stop();\n    this.stage = null;\n    this.transmitTarget = null;\n  }\n  /**\n   * ステージに対する当たり判定を行う。\n   * @param e\n   */\n\n\n  hitTestStage(e) {\n    const obj = this.stage.getObjectUnderPoint(e.offsetX, e.offsetY, 1);\n    return obj != null;\n  }\n\n  onMouseMoveNonDragging(e) {\n    if (this.mouseMoveCounter !== 0) {\n      return;\n    } //ドラッグ中ではない場合、stageにヒットしたら処理中断\n\n\n    const isHit = this.hitTestStage(e);\n    if (isHit) return;\n    const cloneEvent = new MouseEvent(e.type, e);\n    this.transmitTarget.dispatchEvent(cloneEvent);\n  }\n\n}\n\n//# sourceURL=webpack:///./esm/MouseEventTransmitter.js?");

/***/ }),

/***/ "./esm/index.js":
/*!**********************!*\
  !*** ./esm/index.js ***!
  \**********************/
/*! exports provided: MouseEventTransmitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _MouseEventTransmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MouseEventTransmitter */ \"./esm/MouseEventTransmitter.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"MouseEventTransmitter\", function() { return _MouseEventTransmitter__WEBPACK_IMPORTED_MODULE_0__[\"MouseEventTransmitter\"]; });\n\n\n\n//# sourceURL=webpack:///./esm/index.js?");

/***/ })

/******/ });