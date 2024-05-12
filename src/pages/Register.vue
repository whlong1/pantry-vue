<template>
  <section class="flex flex-col w-full p-4 box-border">
    <h1 class="text-2xl font-bold mb-4 leading-none text-gray-900">Register</h1>
    <form @submit.prevent="register" class="text-black flex flex-col">
      <div class="flex flex-col">
        <label class="font-bold mb-2" for="email">Email:</label>
        <input 
          required
          id="email"
          type="email"
          autocomplete="on"
          placeholder="Email"
          v-model="form.email"
          class="border-gray-400 border text-xs font-regular p-2 rounded-sm mb-2 bg-white"
        >
      </div>
      <div class="flex flex-col">
        <label class="font-bold mb-2" for="password">Password:</label>
        <input 
          required
          id="password"
          type="password"
          autocomplete="on"
          placeholder="Password"
          v-model="form.password"
          class="border-gray-400 border text-xs font-regular p-2 rounded-sm mb-2 bg-white"
        >
      </div>
      <button type="submit"
        class=" text-white bg-blue-500 hover:bg-blue-600 rounded-sm text-sm px-6 py-2 mt-4 font-bold box-border">
        Submit
      </button>
    </form>
  </section>
</template>

<script setup>
const BASE_URL = `${import.meta.env.VITE_SERVERLESS_URL}/register`;
import { ref } from 'vue';
import { auth } from '../store/auth';

const form = ref({
  email: '',
  password: '',
});

const register = async () => {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value)
  });

  if (response.ok) {
    const data = await response.json();
    auth.login(data.token);
  } else {
    const errData = await response.json();
    console.error('Registration Error:', errData);
  }
}


</script>