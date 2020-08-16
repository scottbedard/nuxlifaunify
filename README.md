# netlifauna

An experimental starting point for [Netlify](https://www.netlify.com/), [Fauna](https://fauna.com/), and [Typescript](https://www.typescriptlang.org/).

### Getting started

1. Register [Fauna](https://fauna.com/) account
2. [Create a database](https://docs.fauna.com/fauna/current/start/cloud#create-db)
3. Set client and server keys in `.env`
4. Install [Netlify CLI](https://docs.netlify.com/cli/get-started/#installation)

Once this is done, the following commands will be available.

```bash
# build database
$ node ./schema.js

# start dev server
$ netlify dev

# compile functions
$ npm run build-backend

# build frontend
$ npm run build-frontend
```
