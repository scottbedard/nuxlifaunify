const faunadb = require('faunadb');
const { CreateOrUpdateFunction } = require('../utils');

const q = faunadb.query;

module.exports = CreateOrUpdateFunction({
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
});
