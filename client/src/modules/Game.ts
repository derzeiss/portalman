import { BLOCK_SIZE, HEIGHT, KEYS_P1, WIDTH } from '../config';
import { BaseEntity } from './BaseEntity';
import { InputController } from './InputController';
import { Player } from './Player';
import { TileMap } from './TileMap';

export class Game {
  canvas: HTMLCanvasElement;
  cx: CanvasRenderingContext2D;

  inputController: InputController;
  map: TileMap;
  entities: BaseEntity[] = [];

  constructor(rootSelector: string) {
    const { canvas, cx } = this._initCanvas(rootSelector);
    this.canvas = canvas;
    this.cx = cx;

    this.map = new TileMap();
    this.inputController = new InputController();
  }

  _initCanvas(rootSelector: string) {
    const root = document.querySelector(rootSelector);
    if (!root) throw new Error(`Couldn't find root element with selector "${rootSelector}".`);
    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const cx = canvas.getContext('2d');
    if (!cx) throw new Error(`Couldn't get context from canvas.`);
    root.appendChild(canvas);

    return { canvas, cx };
  }

  start() {
    this.entities = [];
    this.entities.push(new Player(KEYS_P1, BLOCK_SIZE * 1.5, BLOCK_SIZE * 1.5));
    this.map.buildRandomMap();
    this.mainloop();
  }

  mainloop() {
    // clean
    this.cx.clearRect(0, 0, WIDTH, HEIGHT);

    // update
    let i = this.entities.length;
    while (i--) {
      this.entities[i].update(this.inputController);
    }

    // render
    this.map.render(this.cx);
    i = this.entities.length;
    while (i--) {
      this.entities[i].render(this.cx);
    }

    // next frame
    window.requestAnimationFrame(this.mainloop.bind(this));
  }
}
