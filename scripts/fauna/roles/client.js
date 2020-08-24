const faunadb = require('faunadb');
const { CreateOrUpdateRole } = require('../utils');

const q = faunadb.query;

module.exports = CreateOrUpdateRole({
  name: 'client',
  privileges: [
    {
      actions: { call: true },
      resource: q.Function('CreateUser'),
    },
    {
      actions: { call: true },
      resource: q.Function('IsEmail'),
    },
    {
      actions: { call: true },
      resource: q.Function('IsValidPassword'),
    },
  ],
});
