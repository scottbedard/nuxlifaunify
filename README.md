# netlifauna

An experimental starting point for [Netlify](https://www.netlify.com/), [Fauna](https://fauna.com/), and [Typescript](https://www.typescriptlang.org/).

### Getting started

1. Clone repository, `$ git clone git@github.com:scottbedard/netlifauna.git`
2. Create [Fauna](https://fauna.com/) account
3. Install [Fauna shell](https://docs.fauna.com/fauna/current/start/cloud#install) and log in, `$ npm install -g fauna-shell`
4. [Create a database](https://docs.fauna.com/fauna/current/start/cloud#create-db), `$ fauna create-database my_db`
5. [Import graphql schema](https://docs.fauna.com/fauna/current/start/graphql#import)
6. Install [Netlify CLI](https://docs.netlify.com/cli/get-started/#installation), `$ npm install -g netlify-cli`

Once this is done, the following commands will be available.

```bash
# start dev server
$ netlify dev

# compile functions
$ npm run build-backend

# build frontend
$ npm run build-frontend
```
