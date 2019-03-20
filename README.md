# createjs-mouse-event-transmitter

Transmit mouse events from createjs stage to other canvas.

This feature is similar to [nextStage](https://createjs.com/docs/easeljs/classes/Stage.html#property_nextStage) property of createjs. The difference is the class of target. 

## Demo

[Demo Page](https://masatomakino.github.io/createjs-mouse-event-transmitter/demo/)

## Getting Started

### Install

createjs-mouse-event-transmitter depend on [CreateJS / EaselJS](https://github.com/CreateJS/EaselJS)

```bash
npm install easeljs --save-dev
```

or load script files in html.

```html
<script src="https://code.createjs.com/1.0.0/easeljs.min.js"></script>
```

and

```bash
npm install https://github.com/MasatoMakino/createjs-mouse-event-transmitter.git --save-dev
```

### Import

createjs-mouse-event-transmitter is composed of ES6 modules and TypeScript d.ts files.

At first, import a class.

```js
import { MouseEventTransmitter } from "createjs-mouse-event-transmitter";
```

### Setting stage

Enables mouse over events for a stage.

[enableMouseOver](https://createjs.com/docs/easeljs/classes/Stage.html#method_enableMouseOver)

```js
stage.enableMouseOver();
```

### Init

Init html

```html
<body>
  <canvas id="topCanvas" width="1920" height="1080"></canvas>
  <canvas id="bottomCanvas" width="1920" height="1080"></canvas>
</body>
```

and javascript.

```js
const topCanvas = document.getElementById("topCanvas");
const stage = new createjs.Stage(topCanvas);
stage.enableMouseOver();

const bottomCanvas = document.getElementById("bottomCanvas");
const transmitter = new MouseEventTransmitter(stage, bottomCanvas);
```

`bottomCanvas` is able to handle mouse events.

```js
bottomCanvas.addEventListener("mousedown", e => {
  console.log(e.type);
});
```

[API documents](https://masatomakino.github.io/createjs-mouse-event-transmitter/api/index.html)

see also [demo script](https://masatomakino.github.io/createjs-mouse-event-transmitter/demo/main.js).

## License

createjs-mouse-event-transmitter is [MIT licensed](LICENSE).
