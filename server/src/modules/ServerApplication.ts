import { EV_CLIENT_CONNECTED, EV_CONNECTION, EV_DISCONNECT } from 'portalman_shared';
import { Server, Socket } from 'socket.io';
import { GameServer } from './GameServer';

export class ServerApplication {
  io: Server;
  games: GameServer[] = [];
  sockets: Socket[] = [];

  constructor(io: Server) {
    this.io = io;
    this._setupHandler();
  }

  _handleSocketDisconnect(socket: Socket) {
    this.sockets = this.sockets.filter((s) => s.id !== socket.id);
  }

  _setupHandler() {
    this.io.on(EV_CONNECTION, (socket: Socket) => {
      this.sockets.push(socket);
      socket.emit(EV_CLIENT_CONNECTED);

      socket.on(EV_DISCONNECT, () => this._handleSocketDisconnect(socket));

      // TODO only start game with 2 players
      this.startGame([socket]);
    });
  }

  startGame(sockets: Socket[]) {
    const game = new GameServer(this.io, sockets);
    this.games.push(game);
    game.start();
  }
}
