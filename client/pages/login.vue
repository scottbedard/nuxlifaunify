<template>
  <div>
    <form class="gap-3 grid max-w-sm" @submit.prevent="onSubmit">
      <h2 class="font-bold text-xl">Log in</h2>
      <input
        v-model="form.email"
        class="border border-gray-500 px-4 py-2 rounded"
        placeholder="Email"
        type="email"
        :disabled="authenticateCurrentUserIsLoading" />
      <input
        v-model="form.password"
        class="border border-gray-500 px-4 py-2 rounded"
        placeholder="Password"
        type="password"
        :disabled="authenticateCurrentUserIsLoading" />
      <div>
        <button
          class="px-4 py-2 rounded text-white"
          type="submit"
          :class="
            authenticateCurrentUserIsLoading
              ? 'bg-gray-500'
              : 'bg-blue-500 hover:bg-blue-700'
          "
          :disabled="authenticateCurrentUserIsLoading">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { currentUser, useAuthenticateCurrentUser } from '~/app/behaviors/current-user';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  setup() {
    const {
      authenticateCurrentUser,
      authenticateCurrentUserIsLoading,
    } = useAuthenticateCurrentUser();

    return {
      authenticateCurrentUser,
      authenticateCurrentUserIsLoading,
      currentUser,
    };
  },
  methods: {
    onSubmit() {
      this.authenticateCurrentUser(this.form);
    },
  },
  watch: {
    currentUser(currentUser) {
      if (currentUser) {
        this.$router.replace({ name: 'index' });
      }
    },
  },
};
</script>