import { useCallback, useContext, useEffect, useState } from 'react';
import { Skylab } from '@amplitude-private/skylab-js-client';
import React, { createContext } from 'react';

export const SkylabContext = createContext({
  client: null,
  ready: false,
  loaded: false,
});

export const useSkylab = () => {
  return useContext(SkylabContext);
};

export const SkylabProvider = (props) => {
  const { instanceName, skylabUser, children } = props;
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const startSkylab = useCallback(async () => {
    Skylab.getInstance(instanceName)
      .start(skylabUser)
      .then(() => {
        setLoaded(true);
      });
  }, [instanceName, skylabUser]);

  useEffect(() => {
    startSkylab();
    setReady(true);
  }, [startSkylab]);

  return (
    ready && (
      <SkylabContext.Provider
        value={{
          client: Skylab.getInstance(),
          ready: ready,
          loaded: loaded,
        }}
      >
        {children}
      </SkylabContext.Provider>
    )
  );
};
