import unfetch from 'unfetch';

import { HttpClient } from './interface';

const fetch = window?.fetch || unfetch;

const request: HttpClient['request'] = (
  requestUrl: string,
  method: string,
  headers: Record<string, string>,
  data?: Record<string, string>,
): Promise<Response> => {
  return fetch(requestUrl, {
    method,
    headers,
    body: data && JSON.stringify(data),
  });
};

export const fetchHttpClient: HttpClient = {
  request,
};
