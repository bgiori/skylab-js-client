import { Variant } from './variant';

/**
 * @packageDocumentation
 * @internal
 */
export interface Storage {
  put(key: string, value: Variant): Variant;
  get(key: string): Variant;
  clear(): void;
  getAll(): Record<string, Variant>;
  save();
  load();
}
