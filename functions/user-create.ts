import { createClient } from './utils/fauna';
import { response } from './utils/http';
import { APIGatewayProxyCallback, APIGatewayProxyEvent } from 'aws-lambda';

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
      q.Create(q.Collection('users'), {
        credentials: { password },
        data: { email },
      })
    );

    return response(cb, { user });
  } catch (err) {
    console.log('Error:', err);

    return response(cb, { result: 'failed' }, { statusCode: 500 });
  }
};
