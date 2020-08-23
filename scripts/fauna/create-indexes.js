const faunadb = require('faunadb');

const q = faunadb.query;

function createIndex(obj) {
  return q.Or(
    q.IsIndex(q.Index(obj.name)),
    q.IsIndex(q.CreateIndex(obj))
  );
}

/**
 * Create indexes
 */
module.exports = async (client) => {
  await client.query(
    q.Do(
      createIndex({
        name: 'unique_User_email',
        permissions: { read: 'public'},
        source: q.Collection('User'),
        terms: [
          { field: ['data', 'email'] },
        ],
        unique: true,
      })
    )
  );
}
