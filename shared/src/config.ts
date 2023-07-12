import { PlayerControls } from './types/PlayerControls';

// sizes & dimensions
export const N_BLOCKS = 19;
export const BLOCK_SIZE = 32;

export const PLAYER_SIZE = BLOCK_SIZE * 0.4; // currently this is the radius, so the players size is 80% of BLOCK_SIZE
export const PLAYER_V = 1.2;

export const WIDTH = BLOCK_SIZE * N_BLOCKS;
export const HEIGHT = BLOCK_SIZE * N_BLOCKS;

// colors
export const C_WALL_NO_PORTAL = '#666';
export const C_WALL_PORTAL = '#ccc';
export const C_BLOCK = '#ecc';
export const C_PLAYER = '#d0d';

// keyboard settings
export const KEYS_P1: PlayerControls = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
};

// socket.io events
export const EV_CONNECTION = 'connection';
export const EV_PLAYER_READY = 'player-ready';
export const EV_INPUT_UPDATE = 'input-update';
export const EV_TICK = 'tick';

export const TICK_FPS = 60;
