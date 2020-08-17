import { APIGatewayProxyCallback, APIGatewayProxyEvent } from 'aws-lambda';
import { createClient } from './utils/fauna';
import { sessionKey } from './utils/constants';
import { destroyCookie, response } from './utils/http';

/**
 * Log a user out
 */
export const handler = async function (
  event: APIGatewayProxyEvent,
  context: any,
  cb: APIGatewayProxyCallback
) {
  const { client, q } = createClient(event);

  try {
    await client.query(q.Logout(true));
  } catch (err) {
    console.log('Error:', err);
  } finally {
    // forget the token anyway. they'll need to re-authenticate
    // to get a new one and make authenticated queries again.
    return response(cb, { result: 'success' }, {
      headers: {
        'Set-Cookie': destroyCookie(sessionKey),
      },
      statusCode: 200,
    });
  }
};