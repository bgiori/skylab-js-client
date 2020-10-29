/**
 * @packageDocumentation
 * @module skylab-js-client
 */

/**
 * An IdentityProvider injects a Device ID and User ID into the SkylabUser object before sending a request to the server.
 */
export interface IdentityProvider {
  getDeviceId(): string;
  getUserId(): string;
}
