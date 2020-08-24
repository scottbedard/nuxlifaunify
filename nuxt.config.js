export default {
  buildModules: [
    '@nuxtjs/composition-api',
    '@nuxt/typescript-build',
  ],
  env: {
    FAUNADB_CLIENT_SECRET: process.env.FAUNADB_CLIENT_SECRET || '',
  },
  generate: {
    interval: 2000, // https://github.com/nuxt-community/composition-api/issues/44
  },
  head: {
    bodyAttrs: {
      class: 'bg-gray-200 px-3 text-gray-800 md:px-6',
    },
    link: [
      // notice: 
      // if you actually want to use Tailwind in your project, make
      // sure to install the build module for, don't use the cdn.
      {
        href: 'https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css',
        rel: 'stylesheet',
      },
    ],
  },
  rootDir: 'client',
};
