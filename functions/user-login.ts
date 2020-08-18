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
    const userByEmail = q.Match(q.Index('users_by_email'), email);
    const { secret }: any = await client.query(q.Login(userByEmail, { password }));
    const user = await client.query(q.Get(userByEmail));

    return response(cb, { user }, {
      headers: {
        'Set-Cookie': serializeCookie(sessionKey, secret),
      },
    });
  } catch (err) {
    console.log('Error:', err);

    return response(cb, {}, { statusCode: 401 });
  }
};
