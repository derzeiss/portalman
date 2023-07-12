import { EntityDto, Serializable } from 'portalman_shared';

export class ClientEntity implements Serializable<EntityDto> {
  id: string;
  x: number;
  y: number;
  dirty = false;

  constructor(id: string, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
  }

  render(cx: CanvasRenderingContext2D) {
    cx.save();
    cx.fillStyle = '#f0f';
    cx.fillRect(this.x, this.y, 100, 100);
    cx.restore();
  }

  serialize() {
    throw new Error('Not implemented.');
    return {} as EntityDto;
  }

  deserialize(data: EntityDto) {
    this.x = data.x;
    this.y = data.y;
  }

  static from(data: EntityDto) {
    return new ClientEntity(data.id, data.x, data.y);
  }
}
