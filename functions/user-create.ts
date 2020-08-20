import { APIGatewayProxyCallback, APIGatewayProxyEvent } from 'aws-lambda';
import { createClient } from './utils/fauna';
import { response, serializeCookie } from './utils/http';
import { sessionKey } from './utils/constants';

/**
 * Create a user
 */
export const handler = async function (
  event: APIGatewayProxyEvent,
  context: any,
  cb: APIGatewayProxyCallback
) {
  const { client, q } = createClient(event);
  const { email, password } = JSON.parse(event.body || '{}');

  try {
    const user = await client.query(
      q.Create(q.Collection('User'), {
        credentials: { password },
        data: { email },
      })
    );

    const { secret }: any = await client.query(
      q.Login(q.Match(q.Index('unique_User_email'), email), { password })
    );

    return response(cb, { user }, {
      headers: {
        'Set-Cookie': serializeCookie(sessionKey, secret),
      },
    });
  } catch (err) {
    console.log('Error:', err);

    return response(cb, {}, { statusCode: 500 });
  }
};
