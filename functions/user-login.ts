import { destroyCookie, lambda, serializeCookie } from './utils/http';
import { FaunaDocument } from './utils/types';
import { sessionKey } from './utils/constants';
import { toData } from './utils/fauna';
import { User, UserData } from './models/user';

/**
 * Authenticate user
 */
export const handler = lambda(async (client, payload) => {
  try {
    const user = new User(payload);

    const { secret } = await client.query<{ secret: string }>(
      user.login()
    );

    const result = await client.query<FaunaDocument<UserData>>(
      user.findByEmail()
    );

    // authenticated
    return [{
      user: toData(result),
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
