import { createClient } from './utils/fauna';
import { response } from './utils/http';
import { APIGatewayProxyCallback, APIGatewayProxyEvent } from 'aws-lambda';

/**
 * Get the authenticated user.
 */
export const handler = async function (
  event: APIGatewayProxyEvent,
  context: any,
  cb: APIGatewayProxyCallback
) {
  const { client, q } = createClient(event);

  try {
    const user = await client.query(q.Get(q.Identity()));
    
    return response(cb, { user });
  } catch (e) {
    return response(cb, { user: null });
  }
};