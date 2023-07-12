export class FpsCounter {
  _count: number;
  _timeout: number;

  constructor() {
    this._count = 0;
    this._timeout = 0;
    this._nextSecond();
  }

  nextFrame() {
    this._count++;
  }

  _nextSecond() {
    console.log('FPS', this._count);
    this._count = 0;
    this._timeout = setTimeout(this._nextSecond.bind(this), 1000);
  }
}
