const faunadb = require('faunadb');

const q = faunadb.query;

function createCollection(obj) {
  return q.Or(
    q.IsCollection(q.Collection(obj.name)),
    q.IsCollection(q.CreateCollection(obj))
  );
}

module.exports = async (client) => {
  await client.query(
    q.Do(
      createCollection({
        name: 'User',
      })
    )
  );
};
