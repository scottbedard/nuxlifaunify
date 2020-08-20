import { destroyCookie, lambda } from './utils/http';
import { sessionKey } from './utils/constants';

/**
 * Log a user out
 */
export const handler = lambda(async ({ client, q }) => {
  try {
    await client.query(q.Logout(true));
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
