/**
 * @packageDocumentation
 * @module skylab-js-client
 */

import { IdentityProvider } from './identity';
import { SkylabUser } from './user';

export interface Client {
  start(user: SkylabUser): Promise<Client>;
  setUser(user: SkylabUser): Promise<Client>;
  getVariant(flagKey: string, fallback: string): string;
  getVariantData(flagKey: string, fallback: any): any;
  setIdentityProvider(identityProvider: IdentityProvider): Client;
}
