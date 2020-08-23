const faunadb = require('faunadb');

const q = faunadb.query;

function createFunction(obj) {
  return q.Do(
    q.If(
      q.IsFunction(q.Function(obj.name)),
      q.Delete(q.Function(obj.name)),
      null,
    ),
    q.CreateFunction(obj)
  );
}

/**
 * Create functions
 */
module.exports = async (client) => {
  await client.query(
    q.Do(
      // CreateUser
      createFunction({
        name: 'CreateUser',
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
              })
            )
          )
        )
      }),

      // IsEmail
      createFunction({
        name: 'IsEmail',
        body: q.Query(
          q.Lambda(
            'email',
            q.And(
              q.IsString(q.Var('email')),
              q.ContainsStrRegex(
                q.Var('email'),
                '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
              )
            )
          )
        )
      }),

      // IsValidPassword
      createFunction({
        name: 'IsValidPassword',
        body: q.Query(
          q.Lambda(
            'password',
            q.And(
              q.IsString(q.Var('password')),
              q.GTE(q.Length(q.Var('password')), 8), // min length
            )
          )
        )
      })
    )
  );
}