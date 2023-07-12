import {
  EV_GAME_START,
  EV_MAP_UPDATE,
  EV_TICK,
  MapUpdatePayload,
  PLAYER_DEFAULT_CONTROLS,
  TICK_FPS,
  TickPayload,
} from 'portalman_shared';
import { EntityDto } from 'portalman_shared/dist/types/dtos/EntityDto';
import { Server, Socket } from 'socket.io';
import { ServerEntity } from './ServerEntity';
import { ServerPlayer } from './ServerPlayer';
import { randomUUID } from 'crypto';
import { ServerMap } from './ServerMap';

export class GameServer {
  id: string;
  io: Server;
  sockets: Socket[];
  map: ServerMap;
  entities: ServerEntity[] = [];

  constructor(io: Server, sockets: Socket[]) {
    this.id = randomUUID();
    this.io = io;
    this.sockets = sockets;
    this.map = new ServerMap();
  }

  start() {
    this.entities = [];
    this.sockets.forEach((s) => {
      this.addEntity(new ServerPlayer(s, PLAYER_DEFAULT_CONTROLS, 0, 0));
      s.join(this.id);
    });
    this.io.to(this.id).emit(EV_GAME_START);
    const payload: MapUpdatePayload = { tiles: this.map.serialize() };
    this.io.to(this.id).emit(EV_MAP_UPDATE, payload);
    this.mainloop(true);
  }

  addEntity = (e: ServerEntity) => {
    this.entities.push(e);
  };

  mainloop(forceUpdate = false) {
    const updatedEntities: EntityDto[] = [];
    let i = this.entities.length;
    while (i--) {
      const e = this.entities[i];
      if (e.update() || forceUpdate) updatedEntities.push(e.serialize());
    }

    const payload: TickPayload = { updatedEntities };
    this.sockets.forEach((s) => s.emit(EV_TICK, payload));
    setTimeout(this.mainloop.bind(this), 1000 / TICK_FPS);
  }
}
