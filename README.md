# nuxtlifaunify

An experimental starting point for [Netlify](https://www.netlify.com/), [Fauna](https://fauna.com/), [Typescript](https://www.typescriptlang.org/), and [Nuxt](https://nuxtjs.org/).

### Getting started

1. Register [Fauna](https://fauna.com/) account
2. [Create a database](https://docs.fauna.com/fauna/current/start/cloud#create-db)
3. Set server key in `.env`
4. Build the database, `$ node ./schema.js`
5. Install [Netlify CLI](https://docs.netlify.com/cli/get-started/#installation)

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

This project is primarily an excuse to learn more about severless technology and the Jamstack apps in general. That said, I'd like it to support to following features so it can serve as a starting point for future apps.

1. Be entirely serverless and ready to deploy with Netlify
2. Have easy database management and support disposable dev environments
3. Demonstrate basic user authentication without exposing sensitive tokens to the client
4. Compile backend lambda functions using Typescript
