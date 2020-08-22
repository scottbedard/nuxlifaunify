import * as cookie from 'cookie';
import { Client, Expr, query as q } from 'faunadb';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { sessionKey } from './constants';
import { FaunaDocument } from './types';

/**
 * Create a Fauna client for the current user.
 */
export function createClient(event: APIGatewayProxyEvent) {
  const cookies = cookie.parse(event?.headers?.cookie || '');

  return new Client({
    secret: cookies?.[sessionKey] || process.env.FAUNADB_SERVER_SECRET || '',
  });
}

/**
 * Execute one or more query expressions.
 */
export function query<T>(client: Client, expr: Expr | Expr[]) {
  return Array.isArray(expr)
    ? client.query<T>(q.Do(...expr))
    : client.query<T>(q.Do(expr));
}

/**
 * Return data from a Fauna document.
 */
export function toData<T>(document: FaunaDocument<T>) {
  return document.data;
}