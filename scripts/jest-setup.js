require('dotenv').config();

const chalk = require('chalk');
const faunadb = require('faunadb');
const bootstrap = require('./bootstrap');

/**
 * Jest setup
 *
 * @return {Promise}
 */
module.exports = async () => {
  console.log(
    chalk.bold.dim('\nBootstrapping test database...')
  );

  const client = new faunadb.Client({
    secret: process.env.FAUNADB_TEST_SECRET,
  });

  const q = faunadb.query;

  // create child database and key to isolate this test
  const key = await client.query(
    q.Do(
      q.If(
        q.IsDatabase(q.Database(process.env.FAUNADB_TEST_NAME)),
        q.Delete(q.Database(process.env.FAUNADB_TEST_NAME)),
        null
      ),
      q.CreateDatabase({
        name: process.env.FAUNADB_TEST_NAME,
      }),
      q.CreateKey({
        database: q.Database(process.env.FAUNADB_TEST_NAME),
        role: 'server',
      })
    )
  );
  
  // store the key for teardown purposes
  global.jestFaunaKey = key;

  // create a client connected to the child db and
  // use it to bootstrap collections and indexes
  const childClient = new faunadb.Client({
    secret: key.secret,
  });

  await bootstrap(childClient);

  console.log(
    chalk.green.bold('Done.\n')
  );
}
