import { C_PLAYER, EntityDto, PLAYER_SIZE } from 'portalman_shared';
import { ClientEntity } from './ClientEntity';

export class ClientPlayer extends ClientEntity {
  constructor(id: string, x: number, y: number) {
    super(id, x, y);
  }

  render(cx: CanvasRenderingContext2D) {
    cx.fillStyle = C_PLAYER;
    cx.beginPath();
    cx.arc(this.x, this.y, PLAYER_SIZE, 0, 2 * Math.PI, false);
    cx.fill();
  }

  static from(data: EntityDto) {
    return new ClientPlayer(data.id, data.x, data.y);
  }
}
