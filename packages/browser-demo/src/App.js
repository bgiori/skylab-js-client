import './App.css';
import React from 'react';

import { Skylab } from '@amplitude-private/skylab-js-client';
import { useSkylab, SkylabProvider } from './skylab';

Skylab.init('client-IAxMYws9vVQESrrK88aTcToyqMxiiJoR');

const Feature = (props) => {
  const { client, ready, loaded } = useSkylab();

  const showFeature = client.getVariant('js-browser-demo') === 'true';
  console.log(
    `showFeature: ${showFeature}, ready: ${ready}, loaded: ${loaded}`,
  );

  return showFeature ? (
    <footer className="footer">
      <img src="/amplitude-logo.svg" alt="Flag enabled!" className="logo" />
    </footer>
  ) : null;
};

export default function App() {
  return (
    <SkylabProvider>
      <div className="container">
        <main className="main">
          <h1 className="title">Browser demo for Skylab</h1>

          <p className="description">
            If you see an image below, the feature flag is enabled
          </p>
          <Feature />
        </main>
      </div>
    </SkylabProvider>
  );
}
