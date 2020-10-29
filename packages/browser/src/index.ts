/**
 * This is the primary Skylab module. This module exports the public interface
 * for use, including the factory methods for initializing and getting SkylabClient instances.
 *
 * @packageDocumentation
 * @module Skylab
 * @preferred
 */

export { AmplitudeIdentityProvider } from './identity/amplitudeIdentityProvider';
export { Skylab } from './factory';
export { StubSkylabClient } from './stubClient';
export { SkylabClient } from './skylabClient';
