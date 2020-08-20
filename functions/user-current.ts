import { destroyCookie, lambda } from './utils/http';
import { FaunaDocument, User } from './utils/types';
import { sessionKey } from './utils/constants';
import { toData } from './utils/fauna';

/**
 * Current user
 */
export const handler = lambda(async ({ client, q }) => {
  try {
    // query the authenticated user
    const user = await client.query<FaunaDocument<User>>(
      q.Get(q.Identity())
    );

    return {
      user: toData(user),
    };
  } catch (err) {
    // not authenticated
    if (err.message === 'missing identity') {
      return [{
        user: null,
      }, {
        headers: {
          'Set-Cookie': destroyCookie(sessionKey),
        },
      }];
    }
    
    throw err;
  }
});
