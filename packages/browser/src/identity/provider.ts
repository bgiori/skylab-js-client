export interface IdentityProvider {
  getDeviceId(): string;
  getUserId(): string;
}
