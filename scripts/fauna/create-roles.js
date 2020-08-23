const faunadb = require('faunadb');

const q = faunadb.query;

function createRole(obj) {
  return q.Do(
    q.If(
      q.IsRole(q.Role(obj.name)),
      q.Delete(q.Role(obj.name)),
      null,
    ),
    q.CreateRole(obj)
  );
}

module.exports = async (client) => {
  await client.query(
    q.Do(
      createRole({
        name: 'Client',
        privileges: [
          {
            actions: { call: true },
            resource: q.Function('CreateUser'),
          },
        ],
      })
    )
  );
}
