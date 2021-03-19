/**
 * @packageDocumentation
 * @module skylab-js-client
 */

import { ContextProvider } from './context';
import { SkylabUser } from './user';
import { Variant, Variants } from './variant';

export interface Client {
  start(user: SkylabUser): Promise<Client>;
  setUser(user: SkylabUser): Promise<Client>;
  getVariant(flagKey: string, fallback?: string | Variant): Variant;
  getVariants(): Variants;
  setContextProvider(contextProvider: ContextProvider): Client;
}
