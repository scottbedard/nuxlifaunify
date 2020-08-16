import { APIGatewayProxyCallback, APIGatewayProxyEvent } from 'aws-lambda';

export const handler = async function (
  event: APIGatewayProxyEvent,
  context: any,
  callback: APIGatewayProxyCallback
) {
  callback(null, {
    body: JSON.stringify({ message: 'Hello world' }),
    statusCode: 200,
  });
};