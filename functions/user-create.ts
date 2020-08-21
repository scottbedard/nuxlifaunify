import { lambda, serializeCookie } from './utils/http';
import { sessionKey } from './utils/constants';
import { toData } from './utils/fauna';
import { User, UserData } from './models/user';
import { FaunaDocument } from './utils/types';

/**
 * Create user
 */
export const handler = lambda(async (client, payload) => {
  try {
    const user = new User(payload);

    const result = await client.query<FaunaDocument<UserData>>(
      user.create()
    );

    const { secret } = await client.query<{ secret: string }>(
      user.login()
    );

    // success
    return [{
      user: toData(result),
    }, {
      headers: {
        'Set-Cookie': serializeCookie(sessionKey, secret),
      },
    }];
  } catch (err) {
    // @todo: handle errors
    throw err;
  }
});
