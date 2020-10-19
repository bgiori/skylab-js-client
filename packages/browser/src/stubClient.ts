import { Defaults } from './config';
import { Client } from './types/client';
import { IdentityProvider } from './types/identity';
import { SkylabUser } from './types/user';

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
}
