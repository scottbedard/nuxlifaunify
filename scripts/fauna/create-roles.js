const faunadb = require('faunadb');

const q = faunadb.query;

function createOrUpdateRole(obj) {
  return q.If(
    q.Exists(q.Role(obj.name)),
    q.Update(q.Role(obj.name), obj),
    q.CreateRole(obj)
  );
}

module.exports = async (client) => {
  await client.query(
    q.Do(
      createOrUpdateRole({
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
      })
    )
  );
}
