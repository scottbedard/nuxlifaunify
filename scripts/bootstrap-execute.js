require('dotenv').config();

const chalk = require('chalk');
const faunadb = require('faunadb');
const bootstrap = require('./bootstrap');

const client = new faunadb.Client({
  secret: checkForFaunaKey(),
});

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

/**
 * Execute
 */
console.log(
  chalk.bold.dim('Bootstrapping database...')
)

bootstrap(client)
  .then(() => {
    console.log(
      chalk.green.bold(`Done.\n`)
    );
  })
  .catch(err => {
    console.log(
      chalk.red.bold(`There was an issue bootstrapping the DB:\n`),
      err
    );

    process.exit(1);
  });