import { APIGatewayProxyCallback, APIGatewayProxyEvent } from 'aws-lambda';
import { response } from './utils/http';

/**
 * Hello world
 */
export const handler = async function (
  event: APIGatewayProxyEvent,
  context: any,
  cb: APIGatewayProxyCallback
) {
  return response(cb, { message: 'Hello world' });
};