import { IdentityProvider } from './identity';
import { SkylabUser } from './user';

export interface Client {
  start(user: SkylabUser): Promise<Client>;
  setUser(user: SkylabUser): Promise<Client>;
  getVariant(flagKey: string, fallback: string): string;
  setIdentityProvider(identityProvider: IdentityProvider): Client;
}
