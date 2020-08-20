import { APIGatewayProxyCallback, APIGatewayProxyEvent } from 'aws-lambda';
import { Client, query } from 'faunadb';
import { createClient } from './fauna';
import { isProduction } from './constants';
import * as cookie from 'cookie';

/**
 * Destroy an http-only cookie.
 */
export function destroyCookie(key: string) {
  return serializeCookie(key, '', -1);
}

/**
 * Create a lambda function with db client
 */
export function lambda(
  handler: (faunaCtx: { client: Client, q: typeof query }, payload: any) => any,
) {
  return async function(
    event: APIGatewayProxyEvent,
    ctx: any,
    callback: APIGatewayProxyCallback
  ) {
    const faunaCtx = createClient(event);

    try {
      const payload = event.body ? JSON.parse(event.body) : null;
      const response: Record<string, any> | [Record<string, any>, Record<string, any>] = await handler(faunaCtx, payload);

      // custom options
      if (Array.isArray(response)) {
        return callback(null, {
          body: toJson(response[0]),
          statusCode: 200,
          ...response[1],
        });
      }

      // default response
      return callback(null, {
        body: toJson(response),
        statusCode: 200,
      });
    } catch (err) {
      // unknown error
      console.error('Error:', err);

      return callback(null, {
        body: toJson({ error: 'unknown' }),
        statusCode: 500,
      });
    }
  }
}

/**
 * Serialize an object to JSON.
 */
export function toJson(obj: any) {
  return JSON.stringify(obj);
}

/**
 * Helper to serialize the response body.
 */
export function response(
  callback: APIGatewayProxyCallback,
  data: Record<string, any>,
  options: Record<string, any> = {},
) {
  return callback(null, {
    body: JSON.stringify(data),
    statusCode: options.statusCode || 200,
    ...options,
  });
}

/**
 * Serialize an http-only cookie.
 */
export function serializeCookie(
  key: string, 
  value: string, 
  maxAge = 14 * 86400, // two weeks
) {
  return cookie.serialize(key, value, {
    httpOnly: true,
    maxAge,
    path: '/',
    secure: isProduction,
  });
}
