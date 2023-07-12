import {
  EV_INPUT_UPDATE,
  EntityType,
  InputState,
  InputUpdatePayload,
  PLAYER_V,
  PlayerControls,
} from 'portalman_shared';
import { ServerEntity } from './ServerEntity';
import { Socket } from 'socket.io';

export class ServerPlayer extends ServerEntity {
  static type = EntityType.PLAYER;

  socket: Socket;
  controls: PlayerControls;
  inputs: InputState;
  vx = 0;
  vy = 0;

  constructor(socket: Socket, controls: PlayerControls, x: number, y: number) {
    super(x, y);
    this.socket = socket;
    this.controls = controls;
    this.inputs = { x: 0, y: 0, bomb: false };

    this._initHandler();
  }

  _initHandler() {
    this.socket.on(EV_INPUT_UPDATE, this._handleInputUpdate.bind(this));
  }

  _handleInputUpdate(data: InputUpdatePayload) {
    this.inputs = data.inputs;
  }

  update() {
    // update velocity
    this.vx = this.inputs.x * PLAYER_V;
    this.vy = this.inputs.y * PLAYER_V;

    if (!this.vx && !this.vy) return false;

    // update position
    this.x += this.vx;
    this.y += this.vy;

    return true;
  }
}
