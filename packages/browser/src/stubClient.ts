import { Defaults } from './config';
import { IdentityProvider } from './types/identity';
import { SkylabUser } from './types/user';

export class StubSkylabClient {

  public constructor() {}

  public async setContext(user: SkylabUser): Promise<StubSkylabClient> {
    return this;
  }

  public async start(user: SkylabUser): Promise<StubSkylabClient> {
    return this;
  }

  public setIdentityProvider(identityProvider: IdentityProvider): StubSkylabClient {
    return this;
  }

  public getVariant(
    flagKey: string,
    fallback: string,
  ): string {
    return Defaults.FALLBACK_VARIANT;
  }
}
