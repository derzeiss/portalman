export class InputController {
  inputs: Record<string, boolean>;

  constructor() {
    this.inputs = {};

    this._setupListeners();
  }

  _setupListeners() {
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
    document.addEventListener('keyup', this._handleKeyUp.bind(this));
  }

  _handleKeyDown(ev: KeyboardEvent) {
    this.inputs[ev.key] = true;
  }

  _handleKeyUp(ev: KeyboardEvent) {
    this.inputs[ev.key] = false;
  }
}
