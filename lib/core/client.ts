import { HttpClient } from './http';
import { Storage } from './storage';
import { urlSafeBase64Encode } from 'lib/core/base64';

const FALLBACK_VARIANT = 'false';
const SERVER_URL = 'https://skylab-api.staging.amplitude.com';

export class SkylabClient {
  protected readonly apiKey: string;
  protected readonly storage: Storage;
  protected readonly httpClient: HttpClient;

  protected serverUrl = SERVER_URL;
  protected userId: string;

  public constructor(apiKey: string, httpClient: HttpClient, storage: Storage) {
    this.apiKey = apiKey;
    this.storage = storage;
    this.httpClient = httpClient;
  }

  public identify(userId: string): SkylabClient {
    this.userId = userId;
    this.storage.clear();
    return this;
  }

  public async init(): Promise<SkylabClient> {
    return this.fetchAll();
  }

  protected async fetchAll(): Promise<SkylabClient> {
    if (this.apiKey === null) {
      return this;
    }
    try {
      const context = { id: this.userId };
      const encodedContext = urlSafeBase64Encode(JSON.stringify(context));
      const response = await this.httpClient.request(
        `${this.serverUrl}/sdk/variants/${encodedContext}`,
        'GET',
        { 'Api-Key': this.apiKey },
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
