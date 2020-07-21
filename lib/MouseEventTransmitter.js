"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseEventTransmitter = void 0;
var Ticker = createjs.Ticker;
/**
 * createjsのcanvasに対するMouseEventを下層に透過させるクラス。
 * stage上にマウスターゲットが存在しない場合、下層のDomElementにMouseEventを透過する。
 */
var MouseEventTransmitter = /** @class */ (function () {
    /**
     * 初期化処理
     * @param {createjs.Stage} stage createjsのstageオブジェクト
     * @param {HTMLElement} transmitTarget MouseEventの透過先domElement
     */
    function MouseEventTransmitter(stage, transmitTarget) {
        var _this = this;
        this.isDragging = false;
        this.isDraggingTransmitTarget = false;
        this.isThrottling = false;
        /**
         * このフレーム数毎にmouseMoveのヒット処理が行われる。
         * 例えば2を指定した場合は、1フレームスキップ、1フレーム処理...の順になる。
         * 1を指定した場合は毎フレーム処理が行われる。
         * 1以上の整数であること。
         */
        this.skipMouseMovePerFrame = 2;
        this.mouseMoveCounter = 0;
        /**
         * wheelイベントを透過する。
         * stageにヒットした場合は伝播が止まる。
         * @param e
         */
        this.onWheelEvent = function (e) {
            var isHit = _this.hitTestStage(e);
            //カンバスにヒットしなければ伝播。
            if (isHit)
                return;
            var cloneEvent = new WheelEvent(e.type, e);
            _this.transmitTarget.dispatchEvent(cloneEvent);
        };
        /**
         * wheelイベントを透過する。
         * stageにヒットした場合は伝播が止まる。
         * @param e
         */
        this.onMouseDown = function (e) {
            var isHit = _this.hitTestStage(e);
            _this.isDragging = true;
            _this.isDraggingTransmitTarget = !isHit;
            //カンバスにヒットしなければ伝播。
            if (isHit)
                return;
            var cloneEvent = new MouseEvent(e.type, e);
            _this.transmitTarget.dispatchEvent(cloneEvent);
        };
        /**
         * mouseupおよびmouseleaveイベントを透過する。
         * この二つのイベントはstageへのヒットにかかわらず、必ず伝播される。
         * @param e
         */
        this.onMouseUpLeave = function (e) {
            var cloneEvent = new MouseEvent(e.type, e);
            _this.transmitTarget.dispatchEvent(cloneEvent);
            _this.isDragging = false;
            _this.isDraggingTransmitTarget = false;
        };
        /**
         * mousemoveイベントを透過する。
         * stage上からドラッグが開始された場合、イベントは伝播されない。
         * 下層のDOMからドラッグが開始された場合、stage上にポインタがかかってもイベントの伝播を継続する。
         * @param e
         */
        this.onMouseMove = function (e) {
            //連続実行の絞り込み中は処理を中断。
            if (_this.isThrottling) {
                return;
            }
            //createjsのステージ上をドラッグ中の場合、moveイベントは伝播しない。
            if (_this.isDragging && !_this.isDraggingTransmitTarget) {
                return;
            }
            _this.isThrottling = true;
            //Transmitterターゲット上をドラッグ中の場合、必ずイベントを伝播
            var cloneEvent = new MouseEvent(e.type, e);
            if (_this.isDraggingTransmitTarget) {
                _this.transmitTarget.dispatchEvent(cloneEvent);
                return;
            }
            //ドラッグ中でない場合は、間引き処理をしながらイベントを上げる
            _this.onMouseMoveNonDragging(e);
        };
        this.stage = stage;
        this.transmitTarget = transmitTarget;
        // @ts-ignore
        if (stage._mouseOverIntervalID == null) {
            console.warn("指定されたstageでドラッグ操作が無効です。" +
                "stage.enableMouseOver()関数を実行してドラッグ操作を有効にしてください。");
        }
        this.start();
        Ticker.addEventListener("tick", function () {
            _this.mouseMoveCounter++;
            _this.mouseMoveCounter %= _this.skipMouseMovePerFrame;
            _this.isThrottling = false;
        });
    }
    MouseEventTransmitter.prototype.start = function () {
        if (this.isListen)
            return;
        var canvas = this.stage.canvas;
        canvas.addEventListener("mousemove", this.onMouseMove, false);
        canvas.addEventListener("mousedown", this.onMouseDown, false);
        canvas.addEventListener("mouseup", this.onMouseUpLeave, false);
        canvas.addEventListener("mouseleave", this.onMouseUpLeave, false);
        canvas.addEventListener("wheel", this.onWheelEvent, false);
        this.isListen = true;
    };
    MouseEventTransmitter.prototype.stop = function () {
        if (!this.isListen)
            return;
        var canvas = this.stage.canvas;
        canvas.removeEventListener("mousemove", this.onMouseMove);
        canvas.removeEventListener("mousedown", this.onMouseDown);
        canvas.removeEventListener("mouseup", this.onMouseUpLeave);
        canvas.removeEventListener("mouseleave", this.onMouseUpLeave);
        canvas.removeEventListener("wheel", this.onWheelEvent);
        this.isListen = false;
    };
    /**
     * 全てのイベントリスナーを破棄する。
     */
    MouseEventTransmitter.prototype.dispose = function () {
        this.stop();
        this.stage = null;
        this.transmitTarget = null;
    };
    /**
     * ステージに対する当たり判定を行う。
     * @param e
     */
    MouseEventTransmitter.prototype.hitTestStage = function (e) {
        var obj = this.stage.getObjectUnderPoint(e.offsetX, e.offsetY, 1);
        return obj != null;
    };
    MouseEventTransmitter.prototype.onMouseMoveNonDragging = function (e) {
        if (this.mouseMoveCounter !== 0) {
            return;
        }
        //ドラッグ中ではない場合、stageにヒットしたら処理中断
        var isHit = this.hitTestStage(e);
        if (isHit)
            return;
        var cloneEvent = new MouseEvent(e.type, e);
        this.transmitTarget.dispatchEvent(cloneEvent);
    };
    return MouseEventTransmitter;
}());
exports.MouseEventTransmitter = MouseEventTransmitter;
