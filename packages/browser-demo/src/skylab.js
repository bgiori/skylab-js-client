import {
  Skylab,
  AmplitudeIdentityProvider,
} from '@amplitude-private/skylab-js-client';
import Amplitude from 'amplitude-js';
Amplitude.getInstance().init('a6dd847b9d2f03c816d4f3f8458cdc1d');
Amplitude.getInstance().setUserId('test-user');

Skylab.init('client-IAxMYws9vVQESrrK88aTcToyqMxiiJoR');
Skylab.getInstance().setIdentityProvider(
  new AmplitudeIdentityProvider(Amplitude.getInstance()),
);
Skylab.getInstance().start();

export { Skylab, Amplitude };
