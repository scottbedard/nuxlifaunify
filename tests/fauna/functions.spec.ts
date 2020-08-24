import { Client, query as q } from 'faunadb';
import faunaSetup from '../../scripts/fauna-setup';
import faunaTeardown from '../../scripts/fauna-teardown';

describe('functions', () => {
  let client: Client;

  beforeAll(async () => {
    await faunaSetup();

    client = new Client({
      secret: (global as any).jestFaunaKey.secret,
    });
  });

  afterAll(() => faunaTeardown());

  it('IsEmail', async () => {
    const result = await client.query(
      q.Map(
        [
          'foo@example.com',
          'foo@subdomain.example.com',
          'not an email',
        ],
        q.Lambda('email', q.Call(q.Function('IsEmail'), q.Var('email')))
      )
    );

    expect(result).toEqual([
      true,
      true,
      false,
    ]);
  });
});
