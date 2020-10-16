import { Storage } from '../types/storage';

export class LocalStorage implements Storage {
  protected readonly namespace: string;
  protected map: Record<string, string> = {};

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  put(key: string, value: string): string {
    const oldValue: string = this.get(key);
    this.map[key] = value;
    return oldValue;
  }
  get(key: string): string {
    let value = this.map[key];
    if (value === undefined) {
      value = null;
    }
    return value;
  }
  clear(): void {
    this.map = {};
  }

  getAll(): Record<string, string> {
    return this.map;
  }

  load(): void {
    try {
      this.map = JSON.parse(localStorage.getItem(this.namespace)) || {};
    } catch (e) {
      this.map = {};
    }
  }
  save(): void {
    try {
      localStorage.setItem(this.namespace, JSON.stringify(this.map));
    } catch (e) {
      // pass
    }
  }
}
