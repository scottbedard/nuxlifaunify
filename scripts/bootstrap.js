const faunadb = require('faunadb');

const q = faunadb.query;

/**
 * Bootstrap the database.
 *
 * This can be thought of as a one-way (up) migration. If the
 * reference does not exist, it will be created. Otherwise,
 * it will be left untouched.
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  await query(client,
    createCollection({
      name: 'User',
    })
  );
  
  await query(client,
    createIndex({
      name: 'unique_User_email',
      permissions: { read: 'public'},
      source: q.Collection('User'),
      terms: [
        { field: ['data', 'email'] },
      ],
      unique: true,
    })
  );
}

function createCollection(obj) {
  return q.If(q.IsCollection(q.Collection(obj.name)), null, q.CreateCollection(obj));
}

function createIndex(obj) {
  return q.If(q.IsIndex(q.Index(obj.name)), null, q.CreateIndex(obj));
}

function query(client, ...args) {
  return client.query(q.Do(...args));
}