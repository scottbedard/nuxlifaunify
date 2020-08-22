import { Client, query as q } from 'faunadb';
import { omit } from 'lodash';
import { Model } from './model';
import { FaunaDocument } from '../utils/types';

export type UserData = {
  email: string,
};

type UserDataWithCredentials = UserData & {
  password?: string,
  passwordConfirmation?: string,
};

/**
 * User
 */
export class User extends Model<UserData> {

  password?: string;

  passwordConfirmation?: string;

  /**
   * Constructor
   */
  constructor(data?: UserDataWithCredentials) {
    super(omit(data, ['password', 'passwordConfirmation']));

    if (data) {
      this.password = data.password;
      this.passwordConfirmation = data.passwordConfirmation;
    }
  }

  /**
   * Create.
   */
  create(client: Client) {
    return client.query<FaunaDocument<UserData>>(
      q.Create(
        q.Collection('User'), {
          credentials: {
            password: this.password,
          },
          data: this.data,
        }
      )
    );
  }

  /**
   * Find by email
   */
  findByEmail(client: Client) {
    return client.query<FaunaDocument<UserData>>(
      q.Get(q.Match(q.Index('unique_User_email'), this.data.email))
    );
  }

  /**
   * Get authenticated user identity
   */
  static identity(client: Client) {
    return client.query<FaunaDocument<UserData>>(
      q.Get(q.Identity())
    );
  }

  /**
   * Initial data.
   */
  initialData(): UserData {
    return {
      email: '',
    };
  }

  /**
   * Login
   */
  login(client: Client) {
    return client.query<{ secret: string }>(
      q.Login(
        q.Match(q.Index('unique_User_email'), this.data.email),
        { password: this.password }
      )
    );
  }

  /**
   * Logout
   */
  static logout(client: Client) {
    return client.query(
      q.Logout(true)
    );
  }
}
