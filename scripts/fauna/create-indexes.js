const faunadb = require('faunadb');

const q = faunadb.query;

function createOrUpdateIndex(obj) {
  return q.If(
    q.Exists(q.Index(obj.name)),
    q.Update(q.Index(obj.name), obj),
    q.CreateIndex(obj)
  );
}

/**
 * Create indexes
 */
module.exports = async (client) => {
  await client.query(
    q.Do(
      createOrUpdateIndex({
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
