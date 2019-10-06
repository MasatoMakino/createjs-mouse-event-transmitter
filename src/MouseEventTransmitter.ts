import Stage = createjs.Stage;
import Ticker = createjs.Ticker;

/**
 * createjsのcanvasに対するMouseEventを下層に透過させるクラス。
 * stage上にマウスターゲットが存在しない場合、下層のDomElementにMouseEventを透過する。
 */
export class MouseEventTransmitter {
  private stage: Stage;
  private transmitTarget: HTMLElement;
  private isDragging: boolean = false;
  private isDraggingTransmitTarget: boolean = false;
  private isListen: boolean;
  private isThrottling: boolean = false;
  /**
   * 初期化処理
   * @param {createjs.Stage} stage createjsのstageオブジェクト
   * @param {HTMLElement} transmitTarget MouseEventの透過先domElement
   */
  constructor(stage: Stage, transmitTarget: HTMLElement) {
    this.stage = stage;
    this.transmitTarget = transmitTarget;

    // @ts-ignore
    if (stage._mouseOverIntervalID == null) {
      console.warn(
        "指定されたstageでドラッグ操作が無効です。" +
          "stage.enableMouseOver()関数を実行してドラッグ操作を有効にしてください。"
      );
    }
    this.start();

    Ticker.addEventListener("tick", () => {
      this.isThrottling = false;
    });
  }

  public start(): void {
    if (this.isListen) return;
    const canvas = this.stage.canvas as HTMLCanvasElement;
    canvas.addEventListener("mousemove", this.onMouseMove, false);
    canvas.addEventListener("mousedown", this.onMouseDown, false);
    canvas.addEventListener("mouseup", this.onMouseUpLeave, false);
    canvas.addEventListener("mouseleave", this.onMouseUpLeave, false);
    canvas.addEventListener("wheel", this.onWheelEvent, false);
    this.isListen = true;
  }

  public stop(): void {
    if (!this.isListen) return;
    const canvas = this.stage.canvas as HTMLCanvasElement;
    canvas.removeEventListener("mousemove", this.onMouseMove);
    canvas.removeEventListener("mousedown", this.onMouseDown);
    canvas.removeEventListener("mouseup", this.onMouseUpLeave);
    canvas.removeEventListener("mouseleave", this.onMouseUpLeave);
    canvas.removeEventListener("wheel", this.onWheelEvent);
    this.isListen = false;
  }

  /**
   * 全てのイベントリスナーを破棄する。
   */
  public dispose(): void {
    this.stop();
    this.stage = null;
    this.transmitTarget = null;
  }

  /**
   * wheelイベントを透過する。
   * stageにヒットした場合は伝播が止まる。
   * @param e
   */
  private onWheelEvent = (e: MouseEvent): void => {
    const isHit = this.hitTestStage(e);

    //カンバスにヒットしなければ伝播。
    if (isHit) return;
    const cloneEvent = new MouseEvent(e.type, e);
    this.transmitTarget.dispatchEvent(cloneEvent);
  };

  /**
   * wheelイベントを透過する。
   * stageにヒットした場合は伝播が止まる。
   * @param e
   */
  private onMouseDown = (e: MouseEvent): void => {
    const isHit = this.hitTestStage(e);
    this.isDragging = true;
    this.isDraggingTransmitTarget = !isHit;

    //カンバスにヒットしなければ伝播。
    if (isHit) return;

    const cloneEvent = new MouseEvent(e.type, e);
    this.transmitTarget.dispatchEvent(cloneEvent);
  };

  /**
   * mouseupおよびmouseleaveイベントを透過する。
   * この二つのイベントはstageへのヒットにかかわらず、必ず伝播される。
   * @param e
   */
  private onMouseUpLeave = (e: MouseEvent): void => {
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
  private onMouseMove = (e: MouseEvent): void => {
    //連続実行の絞り込み中は処理を中断。
    if (this.isThrottling) {
      return;
    }
    //createjsのステージ上をドラッグ中の場合、moveイベントは伝播しない。
    if (this.isDragging && !this.isDraggingTransmitTarget) {
      return;
    }
    this.isThrottling = true;

    //Transmitterターゲット上をドラッグ中の場合、必ずイベントを伝播
    const cloneEvent = new MouseEvent(e.type, e);
    if (this.isDraggingTransmitTarget) {
      this.transmitTarget.dispatchEvent(cloneEvent);
      return;
    }

    //ドラッグ中ではない場合、stageにヒットしたら処理中断
    const isHit = this.hitTestStage(e);
    if (isHit) return;

    this.transmitTarget.dispatchEvent(cloneEvent);
  };

  /**
   * ステージに対する当たり判定を行う。
   * @param e
   */
  private hitTestStage(e: MouseEvent): boolean {
    const obj = this.stage.getObjectUnderPoint(e.offsetX, e.offsetY, 1);
    return obj != null;
  }
}
