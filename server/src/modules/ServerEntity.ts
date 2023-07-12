import { EntityDto, Serializable } from 'portalman_shared';

export class ServerEntity implements Serializable {
  static _nextId = 1;
  id: number;

  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.id = ServerEntity._nextId++;
    this.x = x;
    this.y = y;
  }

  /**
   * Entity physics update; called every frame.
   * @returns true if dirty.
   */
  update() {
    return false;
  }

  serialize() {
    throw new Error('Not implemented.');
    return {} as EntityDto;
  }
}
