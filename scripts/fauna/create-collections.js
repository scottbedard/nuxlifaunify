const faunadb = require('faunadb');

const q = faunadb.query;

function createOrUpdateCollection(obj) {
  return q.If(
    q.Exists(q.Collection(obj.name)),
    q.Update(q.Collection(obj.name), obj),
    q.CreateCollection(obj)
  );
}

module.exports = async (client) => {
  await client.query(
    q.Do(
      createOrUpdateCollection({
        name: 'User',
      })
    )
  );
};
