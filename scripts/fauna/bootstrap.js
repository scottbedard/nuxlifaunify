const faunadb = require('faunadb');

const q = faunadb.query;

module.exports = async (client) => {
  // collections
  await client.query(
    q.Do(
      require('./collections/user'),
    )
  );

  // indexes
  await client.query(
    q.Do(
      require('./indexes/unique-user-email')
    )
  );

  // functions
  await client.query(
    q.Do(
      require('./functions/create-user'),
      require('./functions/is-email'),
      require('./functions/is-valid-password')
    )
  );

  // roles
  await client.query(
    q.Do(
      require('./roles/client')
    )
  );
}