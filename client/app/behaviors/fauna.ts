import { Client, Expr, QueryOptions } from 'faunadb';
import { computed, ref } from '@nuxtjs/composition-api';

/**
 * Secret to access the database.
 */
export const secret = ref<string>('');

/**
 * Client bound to the current secret.
 */
export const client = computed(() => {
  return new Client({
    secret: secret.value || (process.env.FAUNADB_CLIENT_SECRET as string),
  });
});

/**
 * Execute a query.
 */
export function query<T>(expr: Expr, options?: QueryOptions) {
  return client.value.query<T>(expr, options);
}

/**
 * Helper alias for constructing queries.
 */
export { query as q } from 'faunadb';