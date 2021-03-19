/**
 * @packageDocumentation
 * @module skylab-js-client
 */

/**
 * An ContextProvider injects information into SkylabUser object
 * before sending a request to the server. This can be used to pass
 * identity (deviceId and userId), or other platform specific context.
 */
export interface ContextProvider {
  // identity related context
  getDeviceId(): string;
  getUserId(): string;

  // platform related context
  getVersion(): string;
  getLanguage(): string;
  getPlatform(): string;
  getOs(): string;
  getDeviceModel(): string;
}
