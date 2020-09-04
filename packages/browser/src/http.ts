import { HttpClient } from '@core';
import { fetch } from './fetch';

export const request: HttpClient['request'] = (
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
