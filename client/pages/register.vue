<template>
  <div>
    <div v-if="success">
      <h2 class="font-bold text-xl">Your account has been created!</h2>
      <p>You may now <nuxt-link class="text-blue-500 hover:text-blue-700" :to="{ name: 'login' }">proceed to the login page</nuxt-link>.</p>
    </div>
    <form v-else class="gap-3 grid max-w-sm" @submit.prevent="onSubmit">
      <h2 class="font-bold text-xl">Create an account</h2>
      <input
        v-model="form.email"
        class="border border-gray-500 px-4 py-2 rounded"
        placeholder="Email"
        type="email"
        :disabled="registerCurrentUserIsLoading" />
      <input
        v-model="form.password"
        class="border border-gray-500 px-4 py-2 rounded"
        placeholder="Password"
        type="password"
        :disabled="registerCurrentUserIsLoading" />
      <div>
        <button
          class="px-4 py-2 rounded text-white"
          type="submit"
          :class="
            registerCurrentUserIsLoading
              ? 'bg-gray-500'
              : 'bg-blue-500 hover:bg-blue-700'
          "
          :disabled="registerCurrentUserIsLoading">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import {
  currentUser,
  useRegisterCurrentUser,
} from '~/app/behaviors/current-user';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      success: false,
    };
  },
  setup() {
    const {
      registerCurrentUser,
      registerCurrentUserIsLoading,
    } = useRegisterCurrentUser();

    return {
      currentUser,
      registerCurrentUser,
      registerCurrentUserIsLoading,
    };
  },
  methods: {
    onSubmit() {
      this.registerCurrentUser(this.form).then(() => {
        this.$router.push({ name: 'index' });
      });
    },
  },
};
</script>