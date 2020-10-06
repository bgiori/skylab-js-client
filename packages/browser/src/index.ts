import { SkylabClient } from './client';
import { Defaults, SkylabConfig } from './config';
import { InMemoryStorage } from './storage/memory';
import { fetchHttpClient } from './transport/http';
import { normalizeInstanceName } from './util/normalize';

const instances = {};

const init = (apiKey?: string, config?: SkylabConfig): SkylabClient => {
  const normalizedName = normalizeInstanceName(
    config?.instanceName || Defaults.INSTANCE_NAME,
  );
  if (!instances[normalizedName]) {
    instances[normalizedName] = new SkylabClient(
      normalizedName,
      apiKey,
      config,
      fetchHttpClient,
      new InMemoryStorage(),
    );
  }
  return instances[normalizedName];
};

const getInstance = (name: string = Defaults.INSTANCE_NAME): SkylabClient => {
  const normalizedName = normalizeInstanceName(name);
  return instances[normalizedName];
};

export const Skylab = {
  init,
  getInstance,
};
