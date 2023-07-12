import {
  EV_CONNECTION,
  EV_INPUT_UPDATE,
  EV_PLAYER_READY,
  EV_TICK,
  InputState,
  InputUpdatePayload,
  KEYS_P1,
  PlayerReadyPayload,
  TICK_FPS,
  TickPayload,
} from 'portalman_shared';
import { ServerEntity } from './ServerEntity';
import { ServerPlayer } from './ServerPlayer';
import { Server, Socket } from 'socket.io';
import { EntityDto } from 'portalman_shared/dist/types/dtos/EntityDto';

export class GameServer {
  io: Server;
  inputs: InputState = {};
  entities: ServerEntity[] = [];
  entitiesById: Record<number, ServerEntity> = {};

  constructor(io: Server) {
    this.io = io;
  }

  start() {
    this.entities = [];
    this._setupHandler();
    this.mainloop();
  }

  addEntity = (e: ServerEntity) => {
    this.entities.push(e);
    this.entitiesById[e.id] = e;
  };

  _setupHandler() {
    this.io.on(EV_CONNECTION, (socket: Socket) => {
      const player1 = new ServerPlayer(this, KEYS_P1, 0, 0);
      this.addEntity(player1);
      const payload: PlayerReadyPayload = { player: player1.serialize() };
      socket.emit(EV_PLAYER_READY, payload);

      socket.on(EV_INPUT_UPDATE, this.handleInputUpdate.bind(this));
    });
  }

  handleInputUpdate(payload: InputUpdatePayload) {
    const player = this.entitiesById[payload.id] as ServerPlayer;
    if (!player) return;
    player.inputs = payload.inputs;
  }

  mainloop() {
    const updatedEntities: EntityDto[] = [];
    let i = this.entities.length;
    while (i--) {
      const e = this.entities[i];
      if (e.update()) updatedEntities.push(e.serialize());
    }

    const payload: TickPayload = { updatedEntities };
    this.io.emit(EV_TICK, payload);
    setTimeout(this.mainloop.bind(this), 1000 / TICK_FPS);
  }
}
