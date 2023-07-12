import { InputState, InputUpdatePayload } from 'portalman_shared';
import { Socket } from 'socket.io-client';

export class InputController {
  id: number;
  socket: Socket;
  inputs: InputState;

  constructor(socket: Socket, id: number) {
    this.id = id;
    this.socket = socket;
    this.inputs = {};

    this._setupListeners();
  }

  _setupListeners() {
    document.addEventListener('keydown', (ev) => this._handleKeyChange(ev.key, true));
    document.addEventListener('keyup', (ev) => this._handleKeyChange(ev.key, false));
  }

  _handleKeyChange(key: string, state: boolean) {
    if (this.inputs[key] === state) return;
    this.inputs[key] = state;

    const payload: InputUpdatePayload = { id: this.id, inputs: this.inputs };
    this.socket.emit('input-update', payload);
  }
}
