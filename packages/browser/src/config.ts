/**
 * @packageDocumentation
 * @module Config
 */

export type SkylabConfig = {
  /**
   * The instance name for the SkylabClient. Instance names are case _insensitive_.
   */
  instanceName?: string;
  /**
   * The server endpoint from which to request variants.
   */
  serverUrl?: string;
  /**
   * The default fallback variant for all {@link SkylabClient.getVariant} calls.
   */
  fallbackVariant?: string;
  /**
   * Initial variant values for flags. This is useful for bootstrapping the client with
   * values determined on the server.
   */
  initialFlags?: { [flagKey: string]: string };
  /**
   * Whether to prioritize initialFlags over localStorage while async requests for variants are still in flight.
   */
  preferInitialFlags: boolean;
  /**
   * True if this client is being initialized on the server side. This is useful for server side rendering.
   * Currently this flag is unused but is reserved for future use.
   */
  isServerSide?: boolean;
  /**
   * Set to true to log some extra information to the console.
   */
  debug?: boolean;
};

export const Defaults = {
  INSTANCE_NAME: '$default_instance',
  FALLBACK_VARIANT: '',
  SERVER_URL: 'https://api.lab.amplitude.com',
  METADATA_STORAGE_KEY: 'amp-sl-meta',
};
