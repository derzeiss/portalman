import { BLOCK_SIZE, N_BLOCKS, Serializable, Tile, TileType, randint } from 'portalman_shared';

export class ServerMap implements Serializable<Tile[]> {
  tiles: Tile[] = [];

  constructor() {
    this.buildRandomMap();
  }

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
        this.tiles.push({ type, x: x * BLOCK_SIZE, y: y * BLOCK_SIZE });
      }
      x++;
      if (x >= N_BLOCKS) {
        x = 0;
        y++;
      }
    }
  }

  serialize(): Tile[] {
    return this.tiles;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deserialize(_data: Tile[]) {
    throw new Error('Not implemented.');
  }
}
