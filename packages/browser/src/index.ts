import { SkylabClient } from '@core';
import { InMemoryStorage } from '@core';
import * as httpClient from './http';
import { SkylabConfig } from 'lib/core/client';

export const init = (apiKey: string, config: SkylabConfig): SkylabClient => {
  return new SkylabClient(apiKey, config, httpClient, new InMemoryStorage());
};
