require('dotenv').config();

const faunadb = require('faunadb');
const bootstrap = require('./bootstrap');

const client = new faunadb.Client({
  secret: process.env.FAUNADB_TEST_ADMIN_SECRET,
});

const q = faunadb.query;

/**
 * Jest setup
 *
 * @return {Promise}
 */
module.exports = async () => {
  global.jestFaunaName = `jest_${Date.now()}`;

  const key = await client.query(
    q.Do(
      q.CreateDatabase({
        name: global.jestFaunaName,
      }),
      q.CreateKey({
        database: q.Database(global.jestFaunaName),
        role: 'server',
      })
    )
  );
  
  // store the key for teardown purposes
  global.jestFaunaKey = key;

  // bootstrap the test database
  const childClient = new faunadb.Client({
    secret: key.secret,
  });

  await bootstrap(childClient);
}
