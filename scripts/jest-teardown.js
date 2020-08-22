require('dotenv').config();

const chalk = require('chalk');
const faunadb = require('faunadb');

const client = new faunadb.Client({
  secret: process.env.FAUNADB_TEST_ADMIN_SECRET,
});

const q = faunadb.query;

/**
 * Jest teardown
 *
 * @return {Promise}
 */
module.exports = async () => {
  console.log(
    chalk.bold.dim('\nCleaning up database...\n')
  );

  await client.query(
    q.Do(
      q.Delete(q.Database(global.jestFaunaName)),
      q.Delete(q.Ref(global.jestFaunaKey.ref))
    )
  );
}
