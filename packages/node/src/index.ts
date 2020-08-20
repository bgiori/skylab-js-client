import { SkylabClient } from '@core';
import { InMemoryStorage } from '@core';
import * as httpClient from './http';

export const init = (apiKey: string): SkylabClient => {
  return new SkylabClient(apiKey, httpClient, new InMemoryStorage());
};
