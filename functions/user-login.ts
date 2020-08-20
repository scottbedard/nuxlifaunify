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
    const uniqueUserByEmail = q.Match(q.Index('unique_User_email'), email);
    const { secret }: any = await client.query(q.Login(uniqueUserByEmail, { password }));
    const user = await client.query(q.Get(uniqueUserByEmail));

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
