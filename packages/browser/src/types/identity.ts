/**
 * This package contains the IdentityProvider interface and some implementations
 *
 * @packageDocumentation
 * @preferred
 * @module Identity
 */

/**
 * An IdentityProvider injects a Device ID and User ID into the SkylabUser object before sending a request to the server.
 */
export interface IdentityProvider {
  getDeviceId(): string;
  getUserId(): string;
}
