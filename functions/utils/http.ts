import * as cookie from 'cookie';
import { isProduction } from './constants';
import { APIGatewayProxyCallback } from 'aws-lambda';

/**
 * Destroy an http-only cookie.
 */
export function destroyCookie(key: string) {
  return serializeCookie(key, '', -1);
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
