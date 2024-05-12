<!-- <template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login" class="text-black">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
const BASE_URL = `${import.meta.env.VITE_SERVERLESS_URL}/login`;
import { auth } from '../store/auth';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async login() {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      });

      if (response.ok) {
        const data = await response.json();
        auth.login(data.token);
      } else {
        const errData = await response.json();
        console.error('Login Error:', errData);
      }
    }
  }
}
</script> -->

<template>
  <section class="flex flex-col w-full p-4 box-border">
    <h1 class="text-2xl font-bold mb-4 leading-none">Login</h1>
    <form @submit.prevent="login" class="text-black flex flex-col">
      <div class="flex flex-col">
        <label class="font-bold mb-2" for="email">Email:</label>
        <input
          required
          id="email"
          type="email"
          v-model="form.email"
          class="border-gray-400 border text-xs font-regular p-2 rounded-sm mb-2"
        >
      </div>
      <div class="flex flex-col">
        <label class="font-bold mb-2" for="password">Password:</label>
        <input 
          required
          type="password"
          id="password"
          v-model="form.password"
          class="border-gray-400 border text-xs font-regular p-2 rounded-sm mb-2"
        >
      </div>

      <button type="submit" class=" text-white bg-blue-500 hover:bg-blue-600 rounded-sm text-sm px-6 py-2 mt-4 font-bold box-border">
        Submit
      </button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '../store/auth';
const BASE_URL = `${import.meta.env.VITE_SERVERLESS_URL}/login`;

const form = ref({
  email: '',
  password: '',
});

const login = async () => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value)
  });

  if (response.ok) {
    const data = await response.json();
    auth.login(data.token)
  } else {
    const errData = await response.json();
    console.error('Login Error:', errData);
  }
}
</script>
