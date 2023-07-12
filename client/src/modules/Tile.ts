import { BLOCK_SIZE, C_BLOCK, C_WALL_NO_PORTAL, C_WALL_PORTAL, TileType } from 'portalman_shared';
import { BaseEntity } from './BaseEntity';

export class Tile extends BaseEntity {
  type: TileType;
  constructor(type: TileType, x: number, y: number) {
    super(x, y);
    this.type = type;
  }

  render(cx: CanvasRenderingContext2D) {
    if (this.type === TileType.WALL_NO_PORTAL) cx.fillStyle = C_WALL_NO_PORTAL;
    if (this.type === TileType.WALL_PORTAL) cx.fillStyle = C_WALL_PORTAL;
    else if (this.type === TileType.BLOCK) cx.fillStyle = C_BLOCK;
    cx.fillRect(this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);
  }
}
