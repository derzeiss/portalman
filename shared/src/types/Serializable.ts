import { EntityDto } from './dtos/EntityDto';

export interface Serializable {
  serialize: () => EntityDto;
}
