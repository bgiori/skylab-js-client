import { Storage } from './interface';

export class InMemoryStorage implements Storage {
  protected map: Record<string, string> = {};
  put(key: string, value: string): string {
    const oldValue: string = this.get(key);
    this.map[key] = value;
    return oldValue;
  }
  get(key: string): string {
    const value = this.map[key];
    if (value === undefined) {
      return null;
    } else {
      return value;
    }
  }
  clear(): void {
    this.map = {};
  }
}
