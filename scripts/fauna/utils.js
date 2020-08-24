const faunadb = require('faunadb');

const q = faunadb.query;

/**
 * Fauna utils to bootstrap a database
 */
module.exports = {
  // collection
  CreateOrUpdateCollection(obj) {
    return q.If(
      q.Exists(q.Collection(obj.name)),
      q.Update(q.Collection(obj.name), obj),
      q.CreateCollection(obj)
    );
  },

  // function
  CreateOrUpdateFunction(obj) {
    return q.If(
      q.Exists(q.Function(obj.name)),
      q.Update(q.Function(obj.name), obj),
      q.CreateFunction(obj)
    );
  },

  // index
  CreateOrUpdateIndex(obj) {
    return q.If(
      q.Exists(q.Index(obj.name)),
      q.Update(q.Index(obj.name), obj),
      q.CreateIndex(obj)
    );
  },

  // role
  CreateOrUpdateRole(obj) {
    return q.If(
      q.Exists(q.Role(obj.name)),
      q.Update(q.Role(obj.name), obj),
      q.CreateRole(obj)
    );
  }
};
