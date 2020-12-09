/**
 * @packageDocumentation
 * @module skylab-js-client
 */

import { IdentityProvider } from './identity';
import { SkylabUser } from './user';
import { Variant } from './variant';

export interface Client {
  start(user: SkylabUser): Promise<Client>;
  setUser(user: SkylabUser): Promise<Client>;
  getVariant(flagKey: string, fallback: string): string;
  getVariantData(flagKey: string, fallback: any): any;
  getAllVariants(): Record<string, Variant>;
  setIdentityProvider(identityProvider: IdentityProvider): Client;
}
