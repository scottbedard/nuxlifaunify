const faunadb = require('faunadb');
const { CreateOrUpdateIndex } = require('../utils');

const q = faunadb.query;

module.exports = CreateOrUpdateIndex({
  name: 'unique_User_email',
  permissions: { read: 'public'},
  source: q.Collection('User'),
  terms: [
    { field: ['data', 'email'] },
  ],
  unique: true,
});
