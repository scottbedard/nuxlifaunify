const faunadb = require('faunadb');
const { CreateOrUpdateFunction } = require('../utils');

const q = faunadb.query;

module.exports = CreateOrUpdateFunction({
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
});
