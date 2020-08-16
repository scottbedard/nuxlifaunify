<template>
  <div>
    <form class="gap-3 grid max-w-sm" @submit.prevent="onCreate">
      <h2 class="font-bold text-xl">Create user</h2>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      create: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    onCreate() {
      fetch('/.netlify/functions/user-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.create),
      });
    },
  },
};
</script>
