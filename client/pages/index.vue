<template>
  <div>
    <p v-if="currentUser">
      Welcome back <strong>{{ currentUser.email }}</strong>!
    </p>
    <p v-else>
      You are not logged in, you should do something about that 😉
    </p>
  </div>
</template>

<script>
import { currentUser } from '~/app/behaviors/current-user';

export default {
  setup() {
    return { currentUser };
  },
};
</script>