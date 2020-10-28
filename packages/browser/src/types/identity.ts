/**
 * @packageDocumentation
 * @module Identity
 */

export interface IdentityProvider {
  getDeviceId(): string;
  getUserId(): string;
}
