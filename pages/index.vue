<template>
  <div class="gap-16 grid max-w-4xl mx-auto md:grid-cols-2">
    <div v-if="loading">
      Loading...
    </div>
    
    <template v-else-if="!currentUser">
      <!-- create -->
      <form class="gap-3 grid" @submit.prevent="registerCurrentUser(create)">
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
      <form class="gap-3 grid" @submit.prevent="authenticateCurrentUser(login)">
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
    </div>
  </div>
</template>

<script>
import { useCurrentUser } from '~/app/behaviors/current-user';
import axios from 'axios';

export default {
  data() {
    return {
      create: {
        email: '',
        password: '',
      },
      loading: false,
      login: {
        email: '',
        password: '',
      },
    };
  },
  setup() {
    const {
      authenticateCurrentUser,
      currentUser,
      registerCurrentUser,
    } = useCurrentUser();

    return {
      authenticateCurrentUser,
      currentUser,
      registerCurrentUser,
    };
  },
};
</script>
