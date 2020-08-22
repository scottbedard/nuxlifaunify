import { destroyCookie, lambda } from './utils/http';
import { sessionKey } from './utils/constants';
import { User } from './models/user';

/**
 * Log a user out
 */
export const handler = lambda(async (client) => {
  try {
    await User.logout(client);
  } catch (err) {
    console.log('Error:', err);
  }

  return [{
    result: 'success',
  }, {
    headers: {
      'Set-Cookie': destroyCookie(sessionKey),
    },
    statusCode: 200,
  }];
});
