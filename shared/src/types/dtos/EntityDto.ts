import { EntityType } from '../EntityType';

export interface EntityDto {
  type: EntityType;
  id: string;
  x: number;
  y: number;
}
