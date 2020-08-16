require('dotenv').config();

const chalk = require('chalk');
const faunadb = require('faunadb');
const q = faunadb.query;

// make sure you've created a database using the fauna dashboard
// at https://dashboard.fauna.com, and set a server key in .env
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

// execute queries to build database
async function build() {
  console.log('Building database...\n');

  await CreateCollection({
    name: 'users',
  });

  await CreateIndex({
    name: 'users_by_email',
    permissions: { read: 'public'},
    source: q.Collection('users'),
    terms: [{ field: ['data', 'email'] }],
    unique: true,
  });
}

build()
  .then(() => console.log(chalk.green('✓ Build complete\n')))
  .catch(console.error.bind(console));

// helper functions to make the above queries readable and fault tollerant.
// these can be thought of as one way migrations. they will create the reference
// if it does not exist, otherwise they will do nothing.
const logDone = () => console.log(chalk.green('Done\n'));
const logSkipped = () => console.log(chalk.yellow('Skipped\n'));

function CreateCollection(params) {
  console.log('Creating collection:', chalk.cyan(params.name));

  return client.query(q.IsCollection(q.Collection(params.name))).then(exists => exists
    ? logSkipped()
    : client.query(q.CreateCollection(params)).then(logDone)
  );
}

function CreateIndex(params) {
  console.log('Creating index:', chalk.cyan(params.name));

  return client.query(q.IsIndex(q.Index(params.name))).then(exists => exists
    ? logSkipped()
    : client.query(q.CreateIndex(params)).then(logDone)
  );
}