# nuxlifaunify

[![Netlify](https://img.shields.io/netlify/1f179ae9-7f19-4498-a9fc-853927994842)](https://nuxlifaunify.netlify.app/)
[![Build status](https://img.shields.io/github/workflow/status/scottbedard/nuxlifaunify/Test)](https://github.com/scottbedard/nuxlifaunify/actions?query=workflow%3ATest)
[![Dependencies](https://img.shields.io/david/scottbedard/nuxlifaunify)](https://david-dm.org/scottbedard/nuxlifaunify)
[![License](https://img.shields.io/github/license/scottbedard/nuxlifaunify?color=blue)](https://github.com/scottbedard/nuxlifaunify/blob/master/LICENSE)

An experimental starting point for [Nuxt](https://nuxtjs.org/), [Netlify](https://www.netlify.com/), [Fauna](https://fauna.com/), and [Typescript](https://www.typescriptlang.org/).

[Click here for live demo](https://nuxlifaunify.netlify.app/)

### Getting started

1. Register a [Fauna](https://fauna.com/) account
2. [Create a database](https://docs.fauna.com/fauna/current/start/cloud#create-db)
3. Create a server key and add it to `.env`
4. Install dependencies, `npm install`
5. Build the database, `npm run bootstrap`
6. Install [Netlify CLI](https://docs.netlify.com/cli/get-started/#installation)

Once this is done, the following commands will be available.

```bash
# start dev server
$ netlify dev

# compile backend functions
$ npm run build-be

# build nuxt frontend
$ npm run build-fe
```

### Project goals

This project is primarily an excuse to learn more about severless technology and Jamstack apps. That said, I'd like it to have the following features so it can serve as a starting point for future apps.

- Entirely serverless and ready to deploy with Netlify
- Easy database management for disposable dev environments
- Backend lambda functions compiled with Typescript
- Basic user authentication
