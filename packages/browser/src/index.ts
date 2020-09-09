import { SkylabClient, SkylabConfig } from './core';
import { InMemoryStorage } from './core';
import * as httpClient from './http';

export const init = (apiKey: string, config: SkylabConfig): SkylabClient => {
  return new SkylabClient(apiKey, config, httpClient, new InMemoryStorage());
};
