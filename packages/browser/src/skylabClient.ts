/**
 * The default SkylabClient used to fetch variations from Skylab's servers.
 * @packageDocumentation
 * @module Client
 * @preferred
 */

import { SkylabConfig, Defaults } from './config';
import { LocalStorage } from './storage/localStorage';
import { FetchHttpClient } from './transport/http';
import { Client } from './types/client';
import { IdentityProvider } from './types/identity';
import { Storage } from './types/storage';
import { HttpClient } from './types/transport';
import { SkylabUser } from './types/user';
import { base36Id } from './util/base36Id';
import { urlSafeBase64Encode } from './util/base64';
import { normalizeInstanceName } from './util/normalize';

export class SkylabClient implements Client {
  protected readonly instanceName: string;
  protected readonly apiKey: string;
  protected readonly storage: Storage;
  protected readonly storageNamespace: string;
  protected readonly httpClient: HttpClient;

  protected serverUrl: string;
  protected config: SkylabConfig;
  protected user: SkylabUser;
  protected initialized: boolean;
  protected identityProvider: IdentityProvider;
  protected enrollmentId: string;

  /**
   * Creates a new SkylabClient instance.
   * @param apiKey The Client key for the Skylab project
   * @param config See {@link SkylabConfig} for config options
   */
  public constructor(apiKey: string, config: SkylabConfig) {
    const normalizedInstanceName = normalizeInstanceName(
      config?.instanceName || Defaults.INSTANCE_NAME,
    );
    this.instanceName = normalizedInstanceName;
    this.apiKey = apiKey;
    this.httpClient = FetchHttpClient;
    this.config = config;
    this.serverUrl = config?.serverUrl || Defaults.SERVER_URL;
    const shortApiKey = this.apiKey.substring(this.apiKey.length - 6);
    this.storageNamespace = `amp-sl-${shortApiKey}`;
    this.storage = new LocalStorage(this.storageNamespace);
  }

  /**
   * Starts the client. This will
   * 1. Load the id from local storage, or generate a new one if one does not exist.
   * 2. Asynchronously fetch all variants with the provided user context.
   * 3. Fall back on local storage (or initialFlags if `preferInitialFlags` is true) while the async
   *    request for variants is continuing.
   *
   * If you are using the `initialFlags` config option to pre-load this SDK from the
   * server, you do not need to call `start`.
   *
   * @param user The user context for variants. See {@link SkylabUser} for more details.
   * @returns A promise that resolves when the async request for variants is complete.
   */
  public async start(user: SkylabUser): Promise<SkylabClient> {
    this.user = user || {};
    this.loadEnrollmentId();
    this.storage.load();
    if (this.config?.initialFlags && this.config?.preferInitialFlags) {
      // initial flags take precedent over local storage until flags are fetched
      for (const [flagKey, value] of Object.entries(this.config.initialFlags)) {
        this.storage.put(flagKey, value);
      }
    }
    return this.fetchAll();
  }

  /**
   * Sets the user context. This will reset the in memory variant
   * assignments to the fallback until new variants are fetched.
   * @param user The user context for variants. See {@link SkylabUser} for more details.
   * @returns A promise that resolves when the async request for variants is complete.
   */
  public async setUser(user: SkylabUser): Promise<SkylabClient> {
    this.user = user;
    this.storage.clear();
    this.storage.save();
    return this.fetchAll();
  }

  /**
   * Sets an identity provider that will inject identity information into the user
   * context.
   * See {@link IdentityProvider} for more details
   * @param identityProvider
   */
  public setIdentityProvider(identityProvider: IdentityProvider): SkylabClient {
    this.identityProvider = identityProvider;
    return this;
  }

  private loadEnrollmentId() {
    try {
      this.enrollmentId = localStorage.getItem(Defaults.METADATA_STORAGE_KEY);
    } catch (e) {
      // pass
    }
    if (!this.enrollmentId) {
      this.enrollmentId = base36Id();
      try {
        localStorage.setItem(Defaults.METADATA_STORAGE_KEY, this.enrollmentId);
      } catch (e) {
        // pass
      }
    }
  }

  protected async fetchAll(): Promise<SkylabClient> {
    if (this.apiKey === null) {
      return this;
    }
    try {
      const user = this.user;
      const userContext = {
        ...user,
      };
      if (!userContext.id) {
        userContext.id = this.enrollmentId;
      }
      if (this.identityProvider?.getDeviceId()) {
        userContext.device_id = this.identityProvider.getDeviceId();
      }
      if (this.identityProvider?.getUserId()) {
        userContext.user_id = this.identityProvider.getUserId();
      }
      const encodedContext = urlSafeBase64Encode(JSON.stringify(userContext));
      const response = await this.httpClient.request(
        `${this.serverUrl}/sdk/variants/${encodedContext}`,
        'GET',
        { Authorization: `Api-Key ${this.apiKey}` },
      );
      const json = await response.json();
      this.storage.clear();
      for (const flag of Object.keys(json)) {
        this.storage.put(flag, json[flag]);
      }
      this.storage.save();
    } catch (e) {
      console.error(e);
    }
    return this;
  }

  /**
   * Returns the variant for the provided flagKey.
   * Fallback order:
   * - Provided fallback
   * - Initial flags
   * - fallbackVariant in config
   * - Defaults.FALLBACK_VARIANT (empty string)
   * Fallbacks happen if a value is null or undefined
   * @param flagKey
   * @param fallback A fallback value that takes precedence over any other fallback value.
   */
  public getVariant(flagKey: string, fallback: string): string {
    if (this.apiKey === null) {
      return null;
    }
    let variant: string = this.storage.get(flagKey);
    variant =
      variant ??
      fallback ??
      this.config?.initialFlags?.[flagKey] ??
      this.config?.fallbackVariant ??
      Defaults.FALLBACK_VARIANT;
    return variant;
  }
}
