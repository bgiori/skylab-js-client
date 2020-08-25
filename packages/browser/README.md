# Browser SDK for Skylab

## Overview

This is the web browser SDK for Skylab, Amplitude's experimentation and feature
management platform.

## Browser Compatibility

This SDK works with all major browsers and IE10+. The SDK does make use of
Promises, so if you are targeting a browser that does not have native support
for Promise (for example, IE), you should include a polyfill for Promise, (for
example, [es6-promise](https://github.com/stefanpenner/es6-promise)).

## Getting Started

Install the SDK with npm:

```sh
npm install --save @amplitude-private/skylab-js-sdk
```

```javascript
import * as Skylab from '@amplitude-private/skylab-js-sdk';

const skylab = Skylab.init('sdk-DYRDKIFIsoJdA3cCDM2VMfq0YwIZpq4J');

skylab.identify('user');
skylab.init().then((client) => {
  const variant = client.getVariant('flag-key');
  if (variant === 'A') {
    // variant A
  } else if (variant === 'B') {
    // variant B
  } else {
    // default
  }
});
```
