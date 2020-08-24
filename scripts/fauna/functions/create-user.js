const faunadb = require('faunadb');
const { CreateOrUpdateFunction } = require('../utils');

const q = faunadb.query;

module.exports = CreateOrUpdateFunction({
  name: 'CreateUser',
  role: 'server',
  body: q.Query(
    q.Lambda(
      ['email', 'password'],
      q.Do(
        q.Or(q.Call(q.Function('IsEmail'), q.Var('email')), q.Abort('invalid email')),
        q.Or(q.Call(q.Function('IsValidPassword'), q.Var('password')), q.Abort('invalid password')),
        q.Create(q.Collection('User'), {
          credentials: {
            password: q.Var('password')
          },
          data: {
            email: q.Var('email'),
          },
        }),
        q.Login(
          q.Match(q.Index('unique_User_email'), q.Var('email')),
          { password: q.Var('password') }
        ),
      )
    )
  )
});
