const faunadb = require('faunadb');
const createCollections = require('./fauna/create-collections');
const createFunctions = require('./fauna/create-functions');
const createIndexes = require('./fauna/create-indexes');
const createRoles = require('./fauna/create-roles');

const q = faunadb.query;

/**
 * Bootstrap the database.
 *
 * For collections and indexes this can be thought of as a
 * one-way (up) migration. If the reference doesn't exist,
 * it will be created. Otherwise, it remains unchanged.
 *
 * Functions and roles are destroyed and re-created.
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  await createCollections(client);
  await createIndexes(client);
  await createFunctions(client);
  await createRoles(client);
}
