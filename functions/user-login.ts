import { APIGatewayProxyCallback, APIGatewayProxyEvent } from 'aws-lambda';
import { createClient } from './utils/fauna';
import { sessionKey } from './utils/constants';
import { response, serializeCookie } from './utils/http';

/**
 * Authenticate a user
 */
export const handler = async function (
  event: APIGatewayProxyEvent,
  context: any,
  cb: APIGatewayProxyCallback
) {
  const { client, q } = createClient(event);
  const { email, password } = JSON.parse(event.body || '{}');

  try {
    const { secret }: any = await client.query(
      q.Login(q.Match(q.Index('users_by_email'), email), { password })
    );

    return response(cb, { result: 'success' }, {
      headers: {
        'Set-Cookie': serializeCookie(sessionKey, secret),
      },
    });
  } catch (err) {
    console.log('Error:', err);

    return response(cb, { result: 'failed' }, {
      statusCode: 401,
    });
  }
};
