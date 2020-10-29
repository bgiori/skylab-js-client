/**
 * A SkylabUser object represents an individual end user, and is passed
 * to the server for variation assignment (enrollment).
 * @packageDocumentation
 * @module User
 */

export type SkylabUser = {
  /**
   * The id used for enrollment
   */
  id?: string;

  /**
   * Device ID for associating with an identity in Amplitude
   */
  device_id?: string;

  /**
   * User ID for associating with an identity in Amplitude
   */
  user_id?: string;

  /**
   * Predefined field, must be manually provided
   */
  version?: string;

  /**
   * Predefined field, must be manually provided
   */
  country?: string;

  /**
   * Predefined field, must be manually provided
   */
  city?: string;

  /**
   * Predefined field, must be manually provided
   */
  region?: string;

  /**
   * Predefined field, must be manually provided
   */
  language?: string;

  /**
   * Predefined field, must be manually provided
   */
  platform?: string;

  /**
   * Custom user properties, used for rule base targeting
   */
  user_properties?: Record<
    string,
    string | number | boolean | Array<string | number | boolean>
  >;
};
