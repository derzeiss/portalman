import { BLOCK_SIZE, N_BLOCKS } from '../config';
import { TileType } from '../types/TileType';
import { randint } from '../util/randint';
import { Tile } from './Tile';

export class TileMap {
  tiles: Tile[] = [];

  constructor() {}

  buildRandomMap() {
    this.tiles = [];
    let x = 0;
    let y = 0;
    let type: TileType;
    while (x < N_BLOCKS && y < N_BLOCKS) {
      type = TileType.NONE;
      // outer border
      if (x === 0 || y === 0 || x === N_BLOCKS - 1 || y === N_BLOCKS - 1) {
        type = randint(1, 3) as TileType;
      }
      // inner walls
      else if (x % 2 === 0 && y % 2 === 0) {
        type = TileType.WALL_PORTAL;
      }
      if (type) {
        this.tiles.push(new Tile(type, x * BLOCK_SIZE, y * BLOCK_SIZE));
      }
      x++;
      if (x >= N_BLOCKS) {
        x = 0;
        y++;
      }
    }
  }

  render(cx: CanvasRenderingContext2D) {
    let i = this.tiles.length;
    while (i--) {
      this.tiles[i].render(cx);
    }
  }
}
