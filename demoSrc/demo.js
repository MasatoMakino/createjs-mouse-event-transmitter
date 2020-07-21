import { MouseEventTransmitter } from "../";

const onDomContentsLoaded = () => {
  //ステージ更新処理
  const updateStage = () => {
    stage.update();
  };

  const upperCanvas = initUpperCanvas();
  const stage = initUpperStage(upperCanvas);
  addDummyTexts(stage);

  const bottomCanvas = initBottomCanvas();
  const transmitter = new MouseEventTransmitter(stage, bottomCanvas);
  initBottomCanvasListeners(bottomCanvas);

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.on("tick", updateStage);

  setCanvasStyle([upperCanvas, bottomCanvas]);
};

const initUpperCanvas = () => {
  return document.getElementById("topCanvas");
};

const initBottomCanvas = () => {
  return document.getElementById("bottomCanvas");
};

const initUpperStage = (canvas) => {
  const stage = new createjs.Stage(canvas);
  stage.enableMouseOver();

  const shape = new createjs.Shape();
  shape.graphics.beginFill("#F0F").drawRect(0, 0, 128, 128).endFill();
  shape.x = 400;
  shape.y = 360;
  stage.addChild(shape);

  return stage;
};

const addDummyTexts = (stage) => {
  for (let i = 0; i < 4; i++) {
    const text = new createjs.Text(
      "hit test : this text not hit mouse events.",
      "32px sans-serif"
    );
    text.x = i * 640;
    text.mouseEnabled = false;
    stage.addChild(text);
  }
};

const initBottomCanvasListeners = (bottomCanvas) => {
  bottomCanvas.addEventListener("mousedown", (e) => {
    console.log(e.type);
  });
  bottomCanvas.addEventListener("mouseup", (e) => {
    console.log(e.type);
  });
  bottomCanvas.addEventListener("mousemove", (e) => {
    console.log(e.type);
  });
  bottomCanvas.addEventListener("wheel", (e) => {
    console.log(e.type);
  });
};

const setCanvasStyle = (canvasArray) => {
  canvasArray.forEach((canvas, index) => {
    const style = canvas.style;
    style.position = "absolute";
    style.top = 0;
    style.left = 0;
    style.zIndex = -index;
  });
};

/**
 * DOMContentLoaded以降に初期化処理を実行する
 */
if (document.readyState !== "loading") {
  onDomContentsLoaded();
} else {
  document.addEventListener("DOMContentLoaded", onDomContentsLoaded);
}
