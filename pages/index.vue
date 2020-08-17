<template>
  <div class="gap-16 grid max-w-4xl mx-auto md:grid-cols-2">
    <div v-if="loading">
      Loading...
    </div>
    
    <template v-else-if="!currentUser">
      <!-- create -->
      <form class="gap-3 grid" @submit.prevent="onCreate">
        <h2 class="font-bold text-xl">Create account</h2>
        <input
          v-model="create.email"
          class="border border-gray-500 px-4 py-2 rounded"
          placeholder="Email"
          type="email" />
        <input
          v-model="create.password"
          class="border border-gray-500 px-4 py-2 rounded"
          placeholder="Password"
          type="password" />
        <div>
          <button
            class="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700"
            type="submit">
            Submit
          </button>
        </div>
      </form>

      <!-- login -->
      <form class="gap-3 grid" @submit.prevent="onLogin">
        <h2 class="font-bold text-xl">Login</h2>
        <input
          v-model="login.email"
          class="border border-gray-500 px-4 py-2 rounded"
          placeholder="Email"
          type="email" />
        <input
          v-model="login.password"
          class="border border-gray-500 px-4 py-2 rounded"
          placeholder="Password"
          type="password" />
        <div>
          <button
            class="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700"
            type="submit">
            Submit
          </button>
        </div>
      </form>
    </template>

    <div v-else>
      <h2 class="font-bold mb-2 text-xl">Logged in as:</h2>
      <pre class="mb-2">{{ currentUser }}</pre>
      <a
        class="text-blue-500 hover:text-blue-700"
        href="#"
        @click.prevent="onLogout">
        Click here to log out
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      create: {
        email: '',
        password: '',
      },
      currentUser: null,
      loading: false,
      login: {
        email: '',
        password: '',
      },
    };
  },
  mounted() {
    this.loadCurrentUser();
  },
  methods: {
    /**
     * Load the current user.
     */
    loadCurrentUser() {
      this.loading = true;

      axios.get('/.netlify/functions/user-current').then(response => {
        this.currentUser = response?.data.user?.data || null;
      }).finally(() => {
        this.loading = false;
      });
    },

    /**
     * Create a user
     */
    onCreate() {
      axios.post('/.netlify/functions/user-create', this.create).then(data => {
        this.create.email = '';
        this.create.password = '';
        console.log('User created', data);
      });
    },

    /**
     * Authenticate a user
     */
    onLogin() {
      axios.post('/.netlify/functions/user-login', this.login).then(data => {
        this.login.email = '';
        this.login.password = '';
        console.log('Logged in', data);
      });
    },

    /**
     * Log out
     */
    onLogout() {
      axios.post('/.netlify/functions/user-logout').then(data => {
        this.currentUser = null;
      });
    },
  },
};
</script>
