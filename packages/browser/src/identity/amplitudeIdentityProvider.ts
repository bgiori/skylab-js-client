/**
 * @packageDocumentation
 * @module Identity
 */

import { IdentityProvider } from '../types/identity';

type AmplitudeInstance = {
  options?: AmplitudeOptions;
};

type AmplitudeOptions = {
  deviceId?: string;
  userId?: string;
};

export class AmplitudeIdentityProvider implements IdentityProvider {
  private amplitudeInstance: AmplitudeInstance;
  constructor(amplitudeInstance: AmplitudeInstance) {
    this.amplitudeInstance = amplitudeInstance;
  }
  getDeviceId(): string {
    return this.amplitudeInstance?.options?.deviceId;
  }
  getUserId(): string {
    return this.amplitudeInstance?.options?.userId;
  }
}
