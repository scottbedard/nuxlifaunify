const faunadb = require('faunadb');

const q = faunadb.query;

function createOrUpdateFunction(obj) {
  return q.If(
    q.Exists(q.Function(obj.name)),
    q.Update(q.Function(obj.name), obj),
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
      createOrUpdateFunction({
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
      }),

      // IsEmail
      createOrUpdateFunction({
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
      createOrUpdateFunction({
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