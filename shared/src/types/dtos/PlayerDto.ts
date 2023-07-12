import { EntityDto } from './EntityDto';

export interface PlayerDto extends EntityDto {
  x: number;
  y: number;
  vx: number;
  vy: number;
}
