<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register" class="text-black">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" required>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
const BASE_URL = `${import.meta.env.VITE_SERVERLESS_URL}/register`;
import { auth } from '../store/auth';

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async register() {

      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      });      

      if (response.ok) {
        const data = await response.json();
        auth.login(data.token);
      } else {
        const errData = await response.json();
        console.error('Registration Error:', errData);
      }
    }
  }
}
</script>