import { PlayerReadyPayload, TickPayload } from 'portalman_shared';
import { io } from 'socket.io-client';
import { InputController } from './modules/InputController';
import './style.css';

// const g = new Game('#root');
// g.start();

let id: number;
const socket = io(`http://localhost:3000`);
socket.on('player-ready', (data: PlayerReadyPayload) => {
  id = data.player.id;
  new InputController(socket, id);
});
socket.on('tick', (data: TickPayload) => {
  if (data.updatedEntities.length) console.log(data);
});
