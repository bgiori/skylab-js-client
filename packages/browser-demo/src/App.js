import './App.css';
import React from 'react';

import { Skylab } from '@amplitude-private/skylab-js-client';
import { useSkylab, SkylabProvider } from './skylab';

Skylab.init('client-IAxMYws9vVQESrrK88aTcToyqMxiiJoR', {
  initialFlags: { 'js-browser-demo': 'initial' },
  preferInitialFlags: true,
});

const Feature = (props) => {
  const { client, ready, loaded } = useSkylab();

  const showFeature = client.getVariant('js-browser-demo');
  console.log(
    `js-browser-demo: ${showFeature}, ready: ${ready}, loaded: ${loaded}`,
  );

  return (
    <>
      <p className="description">
        If you see an image below, the feature flag is enabled
      </p>
      <p>{`js-browser-demo: ${showFeature}`}</p>
      {showFeature && (
        <footer className="footer">
          <div>
            <img
              src="/amplitude-logo.svg"
              alt="Flag enabled!"
              className="logo"
            />
          </div>
        </footer>
      )}
    </>
  );
};

export default function App() {
  return (
    <SkylabProvider user={{ user_id: 'user_id' }}>
      <div className="container">
        <main className="main">
          <h1 className="title">Browser demo for Skylab</h1>
          <Feature />
        </main>
      </div>
    </SkylabProvider>
  );
}
