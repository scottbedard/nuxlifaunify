# nuxlifaunify

[![Netlify Status](https://api.netlify.com/api/v1/badges/1f179ae9-7f19-4498-a9fc-853927994842/deploy-status)](https://nuxlifaunify.netlify.app/)

An experimental starting point for [Nuxt](https://nuxtjs.org/), [Netlify](https://www.netlify.com/), [Fauna](https://fauna.com/), and [Typescript](https://www.typescriptlang.org/).

### Getting started

1. Register a [Fauna](https://fauna.com/) account
2. [Create a database](https://docs.fauna.com/fauna/current/start/cloud#create-db)
3. Set server key in `.env`
4. Install dependencies, `$ npm install`
5. Build the database, `$ node ./schema.js`
6. Install [Netlify CLI](https://docs.netlify.com/cli/get-started/#installation)

Once this is done, the following commands will be available.

```bash
# start dev server
$ netlify dev

# compile functions
$ npm run build-backend

# build frontend
$ npm run build-frontend
```

### Project goals

This project is primarily an excuse to learn more about severless technology and Jamstack apps. That said, I'd like it to support to following features so it can serve as a starting point for future apps.

1. Be entirely serverless and ready to deploy with Netlify
2. Have easy database management and support disposable dev environments
3. Demonstrate basic user authentication without exposing sensitive tokens to the client
4. Compile backend lambda functions using Typescript
