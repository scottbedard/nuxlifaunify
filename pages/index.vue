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
      <h2 class="font-bold text-xl">Logged in as:</h2>
      <pre>{{ currentUser.user.data }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.loadCurrentUser();
  },
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
  methods: {
    /**
     * Load the current user.
     */
    loadCurrentUser() {
      this.loading = true;

      fetch('/.netlify/functions/user-current')
        .then(res => res.json())
        .then(user => {
          this.currentUser = user;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    /**
     * Create a user
     */
    onCreate() {
      fetch('/.netlify/functions/user-create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.create),
        })
        .then(res => res.json())
        .then(data => {
          this.create.email = '';
          this.create.password = '';
          console.log('User created', data);
        });
    },

    /**
     * Authenticate a user
     */
    onLogin() {
      fetch('/.netlify/functions/user-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.login),
        })
        .then(res => res.json())
        .then(data => {
          this.login.email = '';
          this.login.password = '';
          console.log('Logged in', data);
        });
    },
  },
};
</script>
