import { Client } from 'faunadb';
import { query } from '../utils/fauna';
import { FaunaDocument } from '../utils/types';
import { User, UserData } from './user';
import faunaSetup from '../../scripts/fauna-setup';
import faunaTeardown from '../../scripts/fauna-teardown';

describe('User', () => {
  let client: Client;

  beforeAll(async () => {
    await faunaSetup();

    client = new Client({
      secret: (global as any).jestFaunaKey.secret,
    });
  });

  afterAll(() => faunaTeardown());

  it('create', async () => {
    const user = new User({
      email: 'create@test.com',
      password: 'secret',
      passwordConfirmation: 'secret',
    });

    const { data } = await user.create(client);

    expect(data.email).toBe('create@test.com');
  });

  it('login, identity, and logout', async () => {
    await new User({
      email: 'login@test.com',
      password: 'secret',
      passwordConfirmation: 'secret',
    }).create(client);

    // attempt authenticating with invalid credentials
    const invalid = new User({
      email: 'login@test.com',
      password: 'wrong-password',
    });

    // @todo: assert invalid credentials exception
    expect(invalid.login(client)).rejects.toThrow();

    // authenticate with correct credentials
    const { secret } = await new User({
      email: 'login@test.com',
      password: 'secret',
    }).login(client);
    
    // we should now be logged in
    const userClient = new Client({ secret });
    const user = await User.identity(userClient);
    expect(user.data.email).toBe('login@test.com');

    // kill the authentication session
    await User.logout(userClient);

    // @todo: assert unauthorized exception
    expect(User.identity(userClient)).rejects.toThrow();
  });
});