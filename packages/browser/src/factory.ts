/**
 * This module provide factory methods for storing singleton instances of
 * {@link SkylabClient}
 * @packageDocumentation
 * @module Skylab
 */

import { Defaults, SkylabConfig } from './config';
import { SkylabClient } from './skylabClient';
import { normalizeInstanceName } from './util/normalize';

const instances = {};

export const Skylab = {
  /**
   * Initializes a {@link SkylabClient} instance and stores it as a singleton
   * accessible with `getInstance(config.instanceName)`. Instance names are case
   * _insensitive_.
   * @param apiKey The Client key for the Skylab project
   * @param config See {@link SkylabConfig} for config options
   */
  init: (apiKey: string, config?: SkylabConfig): SkylabClient => {
    const normalizedName = normalizeInstanceName(
      config?.instanceName || Defaults.INSTANCE_NAME,
    );
    if (!instances[normalizedName]) {
      instances[normalizedName] = new SkylabClient(apiKey, config);
    }
    return instances[normalizedName];
  },

  /**
   * Returns the singleton {@link SkylabClient} instance associated with the given name.
   * @param name The instance name. Omit to get the default instance. Instance names are case
   * _insensitive_.
   */
  getInstance: (name: string = Defaults.INSTANCE_NAME): SkylabClient => {
    const normalizedName =
      normalizeInstanceName(name) || Defaults.INSTANCE_NAME;
    return instances[normalizedName];
  },
};
