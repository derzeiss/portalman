import { EV_INPUT_UPDATE, InputState, InputUpdatePayload } from 'portalman_shared';
import { ClientApplication } from './ClientApplication';

export class InputController {
  client: ClientApplication;
  keys: Record<string, boolean>;
  inputs: InputState;

  constructor(client: ClientApplication) {
    this.client = client;
    this.keys = {};
    this.inputs = { x: 0, y: 0, bomb: false };

    this._setupListeners();
  }

  _setupListeners() {
    document.addEventListener('keydown', (ev) => this._handleKeyChange(ev.key, true));
    document.addEventListener('keyup', (ev) => this._handleKeyChange(ev.key, false));
  }

  _handleKeyChange(key: string, state: boolean) {
    this.keys[key] = state;

    const lastInputs = JSON.stringify(this.inputs);

    if (this.keys[this.client.controls.left]) this.inputs.x = -1;
    else if (this.keys[this.client.controls.right]) this.inputs.x = 1;
    else this.inputs.x = 0;

    if (this.keys[this.client.controls.up]) this.inputs.y = -1;
    else if (this.keys[this.client.controls.down]) this.inputs.y = 1;
    else this.inputs.y = 0;

    if (key === this.client.controls.bomb && state) this.inputs.bomb = true;

    // update if inputs changed
    if (lastInputs !== JSON.stringify(this.inputs)) {
      const payload: InputUpdatePayload = { inputs: this.inputs };
      this.client.socket.emit(EV_INPUT_UPDATE, payload);
    }
  }
}
