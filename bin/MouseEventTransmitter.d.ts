/// <reference types="easeljs" />
import Stage = createjs.Stage;
/**
 * createjsのcanvasに対するMouseEventを下層に透過させるクラス。
 * stage上にマウスターゲットが存在しない場合、下層のDomElementにMouseEventを透過する。
 */
export declare class MouseEventTransmitter {
    private stage;
    private transmitTarget;
    private isDragging;
    private isDraggingTransmitTarget;
    private isListen;
    private isThrottling;
    /**
     * 初期化処理
     * @param {createjs.Stage} stage createjsのstageオブジェクト
     * @param {HTMLElement} transmitTarget MouseEventの透過先domElement
     */
    constructor(stage: Stage, transmitTarget: HTMLElement);
    start(): void;
    stop(): void;
    /**
     * 全てのイベントリスナーを破棄する。
     */
    dispose(): void;
    /**
     * wheelイベントを透過する。
     * stageにヒットした場合は伝播が止まる。
     * @param e
     */
    private onWheelEvent;
    /**
     * wheelイベントを透過する。
     * stageにヒットした場合は伝播が止まる。
     * @param e
     */
    private onMouseDown;
    /**
     * mouseupおよびmouseleaveイベントを透過する。
     * この二つのイベントはstageへのヒットにかかわらず、必ず伝播される。
     * @param e
     */
    private onMouseUpLeave;
    /**
     * mousemoveイベントを透過する。
     * stage上からドラッグが開始された場合、イベントは伝播されない。
     * 下層のDOMからドラッグが開始された場合、stage上にポインタがかかってもイベントの伝播を継続する。
     * @param e
     */
    private onMouseMove;
    /**
     * ステージに対する当たり判定を行う。
     * @param e
     */
    private hitTestStage;
}
//# sourceMappingURL=MouseEventTransmitter.d.ts.map