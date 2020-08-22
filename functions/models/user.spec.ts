import { User } from './user';

describe('User', () => {
  it('creates a query to get the current user', () => {
    const query = User.identity();
    
    expect(query._isFaunaExpr).toBe(true);
  });
});