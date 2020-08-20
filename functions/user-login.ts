import { destroyCookie, lambda, serializeCookie } from './utils/http';
import { FaunaDocument, User } from './utils/types';
import { sessionKey } from './utils/constants';
import { toData } from './utils/fauna';

/**
 * Authenticate user
 */
export const handler = lambda(async ({ client, q }, payload) => {
  try {
    const { email, password } = payload;

    const { secret } = await client.query<{ secret: string }>(
      q.Login(q.Match(q.Index('unique_User_email'), email), { password })
    );

    const user = await client.query<FaunaDocument<User>>(
      q.Get(q.Match(q.Index('unique_User_email'), email))
    );

    // authenticated
    return [{
      user: toData(user),
    }, {
      headers: {
        'Set-Cookie': serializeCookie(sessionKey, secret),
      },
    }];
  } catch (err) {
    // auth failed
    if (err.message === 'authentication failed') {
      return [{
        error: 'authentication failed',
      }, {
        headers: {
          'Set-Cookie': destroyCookie(sessionKey),
        },
        statusCode: 401,
      }]
    }

    throw err;
  }
});
