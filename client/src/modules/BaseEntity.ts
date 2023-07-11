import { InputController } from './InputController';

export class BaseEntity {
  static _nextId = 1;
  id: number;

  x: number;
  y: number;
  dirty = false;

  constructor(x = 0, y = 0) {
    this.id = BaseEntity._nextId++;
    this.x = x;
    this.y = y;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_input: InputController) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(_cx: CanvasRenderingContext2D) {}
}
