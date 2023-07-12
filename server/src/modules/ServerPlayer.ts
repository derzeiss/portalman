import { InputState, PLAYER_V, PlayerControls, PlayerDto } from 'portalman_shared';
import { ServerEntity } from './ServerEntity';
import { GameServer } from './GameServer';
import { EntityType } from 'portalman_shared/dist/types/EntityType';

export class ServerPlayer extends ServerEntity {
  game: GameServer;
  controls: PlayerControls;
  inputs: InputState;
  vx = 0;
  vy = 0;

  constructor(game: GameServer, controls: PlayerControls, x: number, y: number) {
    super(x, y);
    this.game = game;
    this.controls = controls;
    this.inputs = {};
  }

  update() {
    if (this.inputs[this.controls.left]) this.vx = -PLAYER_V;
    else if (this.inputs[this.controls.right]) this.vx = PLAYER_V;
    else this.vx = 0;

    if (this.inputs[this.controls.up]) this.vy = -PLAYER_V;
    else if (this.inputs[this.controls.down]) this.vy = PLAYER_V;
    else this.vy = 0;

    this.x += this.vx;
    this.y += this.vy;

    return !!(this.vx || this.vy);
  }

  serialize(): PlayerDto {
    return {
      type: EntityType.PLAYER,
      id: this.id,
      x: this.x,
      y: this.y,
      vx: this.vx,
      vy: this.vy,
    };
  }
}
