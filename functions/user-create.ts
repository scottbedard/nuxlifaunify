import { Client, query as q } from 'faunadb';
import { APIGatewayProxyCallback, APIGatewayProxyEvent } from 'aws-lambda';

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET || '',
});

export const handler = async function (
  event: APIGatewayProxyEvent,
  context: any,
  callback: APIGatewayProxyCallback
) {
  const { email, password } = JSON.parse(event.body || '{}');

  const result = await client.query(
    q.Create(q.Collection('users'), {
      credentials: { password },
      data: { email },
    })
  );

  callback(null, {
    body: JSON.stringify((result as any).data),
    statusCode: 200,
  });
};
