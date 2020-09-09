import { HttpClient } from './http';
import { Storage } from './storage';
import { urlSafeBase64Encode } from 'lib/core/base64';

const FALLBACK_VARIANT = 'false';
const SERVER_URL = 'https://skylab-api.staging.amplitude.com';

export type SkylabContext = {
  id: string;
};

export type SkylabConfig = {
  serverUrl: string;
};

export class SkylabClient {
  protected readonly apiKey: string;
  protected readonly storage: Storage;
  protected readonly httpClient: HttpClient;

  protected serverUrl;
  protected config;
  protected context: SkylabContext;

  public constructor(
    apiKey: string,
    config: SkylabConfig,
    httpClient: HttpClient,
    storage: Storage,
  ) {
    this.apiKey = apiKey;
    this.storage = storage;
    this.httpClient = httpClient;
    this.config = config;
    this.serverUrl = config?.serverUrl || SERVER_URL;
  }

  public setContext(context: SkylabContext): Promise<SkylabClient> {
    this.context = context;
    this.storage.clear();
    return this.fetchAll();
  }

  public async start(context: SkylabContext): Promise<SkylabClient> {
    this.context = context;
    return this.fetchAll();
  }

  protected async fetchAll(): Promise<SkylabClient> {
    if (this.apiKey === null) {
      return this;
    }
    try {
      const context = this.context;
      const encodedContext = urlSafeBase64Encode(JSON.stringify(context));
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
    } catch (e) {
      console.error(e);
    }
    return this;
  }

  public getVariant(flagKey: string, fallback: string): string {
    if (this.apiKey === null) {
      return null;
    }
    let variant: string = this.storage.get(flagKey);
    variant = variant || fallback || FALLBACK_VARIANT;
    return variant;
  }
}
