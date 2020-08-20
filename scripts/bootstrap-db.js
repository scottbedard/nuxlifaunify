require('dotenv').config();

const faunadb = require('faunadb');
const chalk = require('chalk');

const client = new faunadb.Client({
  secret: checkForFaunaKey(),
});

const q = faunadb.query;

/**
 * Idempotent operation to bootstrap database
 */
async function setupFaunaDB() {
  console.log(chalk.yellow(`Attempting to create the DB schemas...`));

  await query(
    createCollection({
      name: 'User',
    })
  );
  
  await query(
    createIndex({
      name: 'unique_User_email',
      permissions: { read: 'public'},
      source: q.Collection('User'),
      terms: [
        { field: ['data', 'email'] },
      ],
      unique: true,
    })
  );
}

/**
 * Helper functions
 */
function checkForFaunaKey() {
  if (!process.env.FAUNADB_SERVER_SECRET) {
    console.log(
      chalk.bold.red(`Required 'FAUNADB_SERVER_SECRET' environment variable not found.`)
    );
    console.log(
      chalk.yellow.bold(`
  Use this link for help creating a server key, and place it in your .env file
  - https://docs.fauna.com/fauna/current/tutorials/authentication/user.html#setup-server-key
      `)
    );
    process.exit(1);
  }

  return process.env.FAUNADB_SERVER_SECRET;
}

function createCollection(obj) {
  return q.If(q.IsCollection(q.Collection(obj.name)), null, q.CreateCollection(obj));
}

function createIndex(obj) {
  return q.If(q.IsIndex(q.Index(obj.name)), null, q.CreateIndex(obj));
}

function query(...args) {
  return client.query(q.Do(...args));
}

/**
 * Execute queries
 */
setupFaunaDB()
  .then(() => console.log(chalk.green(`Done!`)))
  .catch(err => {
    console.log(chalk.red(`There was an issue bootstrapping the DB:\n`), err);
    process.exit(1);
  });