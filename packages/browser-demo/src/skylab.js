import { init } from "@amplitude-private/skylab-js-sdk";

export const Skylab = init("sdk-DYRDKIFIsoJdA3cCDM2VMfq0YwIZpq4J");

Skylab.identify("test-user");
Skylab.fetchAll();
