import * as cookie from 'cookie';
import { Client, query } from 'faunadb';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { sessionKey } from './constants';
import { FaunaDocument } from './types';

/**
 * Create a Fauna client for the current user.
 */
export function createClient(event: APIGatewayProxyEvent) {
  const cookies = cookie.parse(event?.headers?.cookie || '');

  return {
    client: new Client({
      secret: cookies?.[sessionKey] || process.env.FAUNADB_SERVER_SECRET || '',
    }),
    q: query,
  };
}

export function toData<T>(document: FaunaDocument<T>) {
  return document.data;
}