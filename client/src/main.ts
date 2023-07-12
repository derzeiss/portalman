import {
  EV_CLIENT_CONNECTED,
  EV_CONNECTION,
  EV_DISCONNECT,
  EV_GAME_START,
  EV_INPUT_UPDATE,
  EV_MAP_UPDATE,
  EV_TICK,
} from 'portalman_shared';
import { ClientApplication } from './modules/ClientApplication';
import './style.css';

console.log(
  'EV_CONNECTION',
  EV_CONNECTION,
  '| EV_DISCONNECT',
  EV_DISCONNECT,
  '| EV_CLIENT_CONNECTED',
  EV_CLIENT_CONNECTED,
  '| EV_GAME_START',
  EV_GAME_START,
  '| EV_INPUT_UPDATE',
  EV_INPUT_UPDATE,
  '| EV_MAP_UPDATE',
  EV_MAP_UPDATE,
  '| EV_TICK',
  EV_TICK,
);

new ClientApplication();
