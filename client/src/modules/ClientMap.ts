import {
  BLOCK_SIZE,
  C_BLOCK,
  C_WALL_NO_PORTAL,
  C_WALL_PORTAL,
  EV_MAP_UPDATE,
  MapUpdatePayload,
  Tile,
  TileType,
} from 'portalman_shared';
import { Socket } from 'socket.io-client';

export class ClientMap {
  tiles: Tile[] = [];

  constructor(socket: Socket) {
    socket.on(EV_MAP_UPDATE, (data: MapUpdatePayload) => {
      console.log('map update');
      this.tiles = data.tiles;
    });
  }

  render(cx: CanvasRenderingContext2D) {
    let i = this.tiles.length;
    while (i--) {
      const tile = this.tiles[i];
      if (tile.type === TileType.WALL_NO_PORTAL) cx.fillStyle = C_WALL_NO_PORTAL;
      if (tile.type === TileType.WALL_PORTAL) cx.fillStyle = C_WALL_PORTAL;
      else if (tile.type === TileType.BLOCK) cx.fillStyle = C_BLOCK;
      cx.fillRect(tile.x, tile.y, BLOCK_SIZE, BLOCK_SIZE);
    }
  }
}
