export default {
  head: {
    bodyAttrs: {
      class: 'bg-gray-100 p-6 text-gray-800',
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
};
