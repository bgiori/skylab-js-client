import { Skylab } from '@amplitude-private/skylab-js-client';
Skylab.init('client-IAxMYws9vVQESrrK88aTcToyqMxiiJoR');
Skylab.getInstance().start({ id: 'test-user' });

export { Skylab };
