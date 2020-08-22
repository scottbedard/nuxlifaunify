require('dotenv').config();

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
  await client.query(
    q.Do(
      q.Delete(q.Database(global.jestFaunaName)),
      q.Delete(q.Ref(global.jestFaunaKey.ref))
    )
  );
}
