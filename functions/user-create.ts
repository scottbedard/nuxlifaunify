import { lambda, serializeCookie } from './utils/http';
import { sessionKey } from './utils/constants';
import { toData } from './utils/fauna';
import { User } from './models/user';

/**
 * Create user
 */
export const handler = lambda(async (client, payload) => {
  try {
    const user = new User(payload);

    const result = await user.create(client);

    const { secret } = await user.login(client);

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
