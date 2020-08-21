import { destroyCookie, lambda } from './utils/http';
import { FaunaDocument } from './utils/types';
import { sessionKey } from './utils/constants';
import { toData } from './utils/fauna';
import { User, UserData } from './models/user';

/**
 * Current user
 */
export const handler = lambda(async (client) => {
  try {
    // query the authenticated user
    const result = await client.query<FaunaDocument<UserData>>(
      User.identity()
    );

    return {
      user: toData(result),
    };
  } catch (err) {
    // unauthorized / not authenticated
    if (['unauthorized', 'missing identity'].includes(err.message)) {
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
