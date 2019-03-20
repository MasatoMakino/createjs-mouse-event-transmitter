/**
 * createjsのcanvasに対するMouseEventを下層に透過させるクラス。
 * stage上にマウスターゲットが存在しない場合、下層のDomElementにMouseEventを透過する。
 */
export class MouseEventTransmitter {
    /**
     * 初期化処理
     * @param {createjs.Stage} stage createjsのstageオブジェクト
     * @param {HTMLElement} transmitTarget MouseEventの透過先domElement
     */
    constructor(stage, transmitTarget) {
        this.isDragging = false;
        this.isDraggingTransmitTarget = false;
        /**
         * wheelイベントを透過する。
         * stageにヒットした場合は伝播が止まる。
         * @param e
         */
        this.onWheelEvent = (e) => {
            const isHit = this.stage.hitTest(e.layerX, e.layerY);
            //カンバスにヒットしなければ伝播。
            if (isHit)
                return;
            const cloneEvent = new MouseEvent(e.type, e);
            this.transmitTarget.dispatchEvent(cloneEvent);
        };
        /**
         * wheelイベントを透過する。
         * stageにヒットした場合は伝播が止まる。
         * @param e
         */
        this.onMouseDown = (e) => {
            const isHit = this.stage.hitTest(e.layerX, e.layerY);
            this.isDragging = true;
            this.isDraggingTransmitTarget = !isHit;
            //カンバスにヒットしなければ伝播。
            if (isHit)
                return;
            const cloneEvent = new MouseEvent(e.type, e);
            this.transmitTarget.dispatchEvent(cloneEvent);
        };
        /**
         * mouseupおよびmouseleaveイベントを透過する。
         * この二つのイベントはstageへのヒットにかかわらず、必ず伝播される。
         * @param e
         */
        this.onMouseUpLeave = (e) => {
            const cloneEvent = new MouseEvent(e.type, e);
            this.transmitTarget.dispatchEvent(cloneEvent);
            this.isDragging = false;
            this.isDraggingTransmitTarget = false;
        };
        /**
         * mousemoveイベントを透過する。
         * stage上からドラッグが開始された場合、イベントは伝播されない。
         * 下層のDOMからドラッグが開始された場合、stage上にポインタがかかってもイベントの伝播を継続する。
         * @param e
         */
        this.onMouseMove = (e) => {
            //createjsのステージ上をドラッグ中の場合、moveイベントは伝播しない。
            if (this.isDragging && !this.isDraggingTransmitTarget) {
                return;
            }
            //Transmitterターゲット上をドラッグ中の場合、必ずイベントを伝播
            const cloneEvent = new MouseEvent(e.type, e);
            if (this.isDraggingTransmitTarget) {
                this.transmitTarget.dispatchEvent(cloneEvent);
                return;
            }
            //ドラッグ中ではない場合、stageにヒットしたら処理中断
            const isHit = this.stage.hitTest(e.layerX, e.layerY);
            if (isHit)
                return;
            this.transmitTarget.dispatchEvent(cloneEvent);
        };
        this.stage = stage;
        this.transmitTarget = transmitTarget;
        // @ts-ignore
        if (stage._mouseOverIntervalID == null) {
            console.warn("指定されたstageでドラッグ操作が無効です。" +
                "stage.enableMouseOver()関数を実行してドラッグ操作を有効にしてください。");
        }
        const canvas = this.stage.canvas;
        canvas.addEventListener("mousemove", this.onMouseMove, false);
        canvas.addEventListener("mousedown", this.onMouseDown, false);
        canvas.addEventListener("mouseup", this.onMouseUpLeave, false);
        canvas.addEventListener("mouseleave", this.onMouseUpLeave, false);
        canvas.addEventListener("wheel", this.onWheelEvent, false);
    }
    /**
     * 全てのイベントリスナーを破棄する。
     */
    dispose() {
        const canvas = this.stage.canvas;
        canvas.removeEventListener("mousemove", this.onMouseMove);
        canvas.removeEventListener("mousedown", this.onMouseDown);
        canvas.removeEventListener("mouseup", this.onMouseUpLeave);
        canvas.removeEventListener("mouseleave", this.onMouseUpLeave);
        canvas.removeEventListener("wheel", this.onWheelEvent);
        this.stage = null;
        this.transmitTarget = null;
    }
}
