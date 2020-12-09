/**
 * @packageDocumentation
 * @module skylab-js-client
 */

import { Defaults } from './config';
import { Client } from './types/client';
import { IdentityProvider } from './types/identity';
import { SkylabUser } from './types/user';
import { Variant } from './types/variant';

/**
 * A stub {@link Client} implementation that does nothing for all methods
 */
export class StubSkylabClient implements Client {
  public async setUser(user: SkylabUser): Promise<StubSkylabClient> {
    return this;
  }

  public async start(user: SkylabUser): Promise<StubSkylabClient> {
    return this;
  }

  public setIdentityProvider(
    identityProvider: IdentityProvider,
  ): StubSkylabClient {
    return this;
  }

  public getVariant(flagKey: string, fallback: string): string {
    return Defaults.FALLBACK_VARIANT;
  }

  public getVariantData(flagKey: string, fallback: string): any {
    return null;
  }

  public getAllVariants(): Record<string, Variant> {
    return null;
  }
}
