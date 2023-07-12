import {
  EV_CLIENT_CONNECTED,
  EV_GAME_START,
  PLAYER_DEFAULT_CONTROLS,
  PlayerControls,
  SERVER_URL,
} from 'portalman_shared';
import { Socket, io } from 'socket.io-client';
import { ClientGame } from './ClientGame';

export class ClientApplication {
  socket: Socket;
  controls: PlayerControls;

  constructor() {
    this.socket = io(SERVER_URL);
    this.controls = PLAYER_DEFAULT_CONTROLS;

    this.socket.on(EV_CLIENT_CONNECTED, () => {
      console.log('client connected');
    });
    this.socket.on(EV_GAME_START, () => {
      new ClientGame(this, '#root');
    });
  }
}
