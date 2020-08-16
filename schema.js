require('dotenv').config();

const faunadb = require('faunadb');
const q = faunadb.query;

// make sure you've created a database using the fauna dashboard
// at https://dashboard.fauna.com, and set server key in .env
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

// begin executing queries to build database
client.query(
  q.CreateCollection({ name: 'users' })
).then(() => client.query(
  q.CreateIndex({
    name: 'users_by_email',
    permissions: { read: 'public'},
    source: q.Collection('users'),
    terms: [{ field: ['data', 'email'] }],
    unique: true,
  })
))
.then(console.log.bind(console))
.catch(console.error.bind(console));