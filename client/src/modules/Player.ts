import { C_PLAYER, PLAYER_SIZE, PLAYER_V } from '../config';
import { PlayerControls } from '../types/PlayerControls';
import { BaseEntity } from './BaseEntity';
import { InputController } from './InputController';

export class Player extends BaseEntity {
  vx = 0;
  vy = 0;
  controls: PlayerControls;

  constructor(controls: PlayerControls, x: number, y: number) {
    super(x, y);
    this.controls = controls;
  }

  update(input: InputController) {
    if (input.inputs[this.controls.left]) this.vx = -PLAYER_V;
    else if (input.inputs[this.controls.right]) this.vx = PLAYER_V;
    else this.vx = 0;

    if (input.inputs[this.controls.up]) this.vy = -PLAYER_V;
    else if (input.inputs[this.controls.down]) this.vy = PLAYER_V;
    else this.vy = 0;

    this.x += this.vx;
    this.y += this.vy;
  }

  render(cx: CanvasRenderingContext2D) {
    cx.fillStyle = C_PLAYER;
    cx.beginPath();
    cx.arc(this.x, this.y, PLAYER_SIZE, 0, 2 * Math.PI, false);
    cx.fill();
  }
}
