import { SkylabConfig, Defaults } from './config';
import { Storage } from './storage/interface';
import { HttpClient } from './transport/interface';
import { SkylabUser } from './user';
import { urlSafeBase64Encode } from './util/base64';

export class SkylabClient {
  protected readonly instanceName: string;
  protected readonly apiKey: string;
  protected readonly storage: Storage;
  protected readonly httpClient: HttpClient;

  protected serverUrl: string;
  protected config: SkylabConfig;
  protected user: SkylabUser;
  protected initialized: boolean;

  public constructor(
    instanceName: string,
    apiKey: string,
    config: SkylabConfig,
    httpClient: HttpClient,
    storage: Storage,
  ) {
    this.instanceName = instanceName;
    this.apiKey = apiKey;
    this.storage = storage;
    this.httpClient = httpClient;
    this.config = config;
    this.serverUrl = config?.serverUrl || Defaults.SERVER_URL;
  }

  public setContext(user: SkylabUser): Promise<SkylabClient> {
    this.user = user;
    this.storage.clear();
    return this.fetchAll();
  }

  public async start(user: SkylabUser): Promise<SkylabClient> {
    this.user = user;
    return this.fetchAll();
  }

  protected async fetchAll(): Promise<SkylabClient> {
    if (this.apiKey === null) {
      return this;
    }
    try {
      const user = this.user;
      const encodedContext = urlSafeBase64Encode(JSON.stringify(user));
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

  public getVariant(
    flagKey: string,
    fallback: string = Defaults.FALLBACK_VARIANT,
  ): string {
    if (this.apiKey === null) {
      return null;
    }
    let variant: string = this.storage.get(flagKey);
    variant = variant || fallback;
    return variant;
  }
}
