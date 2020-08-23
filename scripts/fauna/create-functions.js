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
            q.Create(
              q.Collection('User'),
              {
                credentials: {
                  password: q.Var('password')
                },
                data: {
                  email: q.Var('email'),
                },
              },
            ),
          )
        ),
        permissions: { call: 'public' },
        role: 'server',
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
      })
    )
  );
}