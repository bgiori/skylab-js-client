export type SkylabConfig = {
  instanceName?: string;
  serverUrl?: string;
  fallbackVariant?: string; // the default fallback variant for getVariant()
  initialFlags?: { [flagKey: string]: string }; // bootstraps the initial variants for flags
  preferInitialFlags: boolean; // prioritizes initialFlags over localStorage
  isServerSide?: boolean; // used for server side rendering
};

export const Defaults = {
  INSTANCE_NAME: '$default_instance',
  FALLBACK_VARIANT: '',
  SERVER_URL: 'https://api.lab.amplitude.com',
  METADATA_STORAGE_KEY: 'amp-sl-meta',
};
