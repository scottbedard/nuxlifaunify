import { FaunaDocument, User } from './utils/types';
import { lambda, serializeCookie } from './utils/http';
import { sessionKey } from './utils/constants';
import { toData } from './utils/fauna';

/**
 * Create user
 */
export const handler = lambda(async ({ client, q }, payload) => {
  const { email, password } = payload;

  try {
    // create and authenticate the user
    const user = await client.query<FaunaDocument<User>>(
      q.Create(q.Collection('User'), {
        credentials: { password },
        data: { email },
      })
    );

    const { secret } = await client.query<{ secret: string }>(
      q.Login(q.Match(q.Index('unique_User_email'), email), { password })
    );

    // success
    return [{
      user: toData(user),
    }, {
      headers: {
        'Set-Cookie': serializeCookie(sessionKey, secret),
      },
    }];
  } catch (err) {
    // @todo: handle common errors
    throw err;
  }
});
