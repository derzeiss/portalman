export interface Serializable<T> {
  serialize: () => T | T[];
  deserialize: (data: T) => void;
}
