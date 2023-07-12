import { EV_TICK, EntityType, HEIGHT, TickPayload, WIDTH } from 'portalman_shared';
import { ClientApplication } from './ClientApplication';
import { ClientEntity } from './ClientEntity';
import { InputController } from './InputController';
import { ClientMap } from './ClientMap';
import { ClientPlayer } from './ClientPlayer';

export class ClientGame {
  client: ClientApplication;
  canvas: HTMLCanvasElement;
  cx: CanvasRenderingContext2D;

  input: InputController;

  map: ClientMap;
  entities: ClientEntity[] = [];

  constructor(client: ClientApplication, rootSelector: string) {
    this.client = client;
    const { canvas, cx } = this._initCanvas(rootSelector);
    this.canvas = canvas;
    this.cx = cx;

    this.input = new InputController(this.client);
    this.map = new ClientMap(this.client.socket);

    this._initHandler();
  }

  _initCanvas(rootSelector: string) {
    const root = document.querySelector(rootSelector);
    if (!root) throw new Error(`Couldn't find root element with selector "${rootSelector}".`);
    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const cx = canvas.getContext('2d');
    if (!cx) throw new Error(`Couldn't get context from canvas.`);
    root.appendChild(canvas);

    return { canvas, cx };
  }

  _initHandler() {
    this.client.socket.on(EV_TICK, this._handleTick.bind(this));
  }

  _handleTick(data: TickPayload) {
    let i = data.updatedEntities.length;
    while (i--) {
      const updatedEntity = data.updatedEntities[i];
      let j = this.entities.length;
      while (j--) {
        const entity = this.entities[j];
        if (entity.id === updatedEntity.id) {
          entity.deserialize(updatedEntity);
          continue;
        }
      }

      // no entity found -> create it
      if (updatedEntity.type === EntityType.PLAYER) {
        this.entities.push(ClientPlayer.from(updatedEntity));
      }
    }

    this.render();
  }

  render() {
    // clean
    this.cx.clearRect(0, 0, WIDTH, HEIGHT);

    // render
    this.map.render(this.cx);
    let i = this.entities.length;
    while (i--) {
      this.entities[i].render(this.cx);
    }
  }
}
