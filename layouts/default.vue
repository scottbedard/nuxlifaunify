<template>
  <div class="container mx-auto">
    <div class="flex flex-wrap items-center justify-between my-6">
      <div class="sm:w-1/2">
        <nuxt-link class="font-bold hover:underline" :to="{ name: 'index' }">
          nuxlifaunify
        </nuxt-link>
      </div>
      <nav class="sm:text-right sm:w-1/2">
        <a
          v-if="currentUser"
          class="text-blue-500 hover:text-blue-700"
          href="#"
          @click.prevent="logoutCurrentUser">
          Log out
        </a>
        <template v-else>
          <nuxt-link
            class="text-blue-500 hover:text-blue-700"
            :to="{ name: 'register' }">
            Create an account
          </nuxt-link>
          or
          <nuxt-link
            class="text-blue-500 hover:text-blue-700"
            :to="{ name: 'login' }">
            log in
          </nuxt-link>
        </template>
      </nav>
    </div>
    <nuxt />
  </div>
</template>

<script>
import { useCurrentUser } from '~/app/behaviors/current-user';

export default {
  mounted() {
    this.refreshCurrentUser();
  },
  setup() {
    const {
      currentUser,
      logoutCurrentUser,
      refreshCurrentUser,
    } = useCurrentUser();

    return {
      currentUser,
      logoutCurrentUser,
      refreshCurrentUser,
    };
  },
};
</script>