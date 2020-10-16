import { IdentityProvider } from "./identity";
import { SkylabUser } from "./user";

export interface Client {
  setContext(user: SkylabUser): Promise<Client>;
  start(user: SkylabUser): Promise<Client>;
  setIdentityProvider(identityProvider: IdentityProvider): Client
  getVariant(flagKey: string, fallback: string): string
}
