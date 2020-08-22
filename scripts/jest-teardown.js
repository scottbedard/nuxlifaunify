require('dotenv').config();

const chalk = require('chalk');
const faunadb = require('faunadb');

/**
 * Jest teardown
 *
 * @return {Promise}
 */
module.exports = async () => {
  console.log(
    chalk.bold.dim('\nCleaning up test database...')
  );

  const client = new faunadb.Client({
    secret: process.env.FAUNADB_TEST_SECRET,
  });

  const q = faunadb.query;


  // destroy the child database and key
  await client.query(
    q.Do(
      q.Delete(q.Database(process.env.FAUNADB_TEST_NAME)),
      q.Delete(q.Ref(global.jestFaunaKey.ref))
    )
  );

  console.log(
    chalk.green.bold('Done.\n')
  );
}
