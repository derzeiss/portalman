import { randomUUID } from 'crypto';
import { EntityDto, EntityType, Serializable } from 'portalman_shared';

export class ServerEntity implements Serializable<EntityDto> {
  static type: EntityType = EntityType.UNKNOWN;

  id: string;
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.id = randomUUID();
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

  serialize(): EntityDto {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: (this.constructor as any).type,
      id: this.id,
      x: this.x,
      y: this.y,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deserialize(_data: EntityDto) {
    throw new Error('Not implemented.');
  }
}
