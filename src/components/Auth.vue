<script setup>
import { ref } from 'vue'
// Ensure your Supabase import path matches your project structure
import { supabase } from '../supabase'

const loading = ref(false)
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

async function changePassword() {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match.")
    return
  }

  try {
    loading.value = true

    const { error } = await supabase.auth.updateUser({
      password: password.value,
    })

    if (error) throw error
    alert("Password successfully changed.")
    password.value = ''
    confirmPassword.value = ''
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

function toggleConfirmPasswordVisibility() {
  showConfirmPassword.value = !showConfirmPassword.value
}
</script>


<template>
  <div class="container">
    <h1>Reset Password</h1>
    <form class="form-widget" @submit.prevent="changePassword">
      <div class="form-group">
        <label for="password">New Password</label>
        <div class="password-wrapper">
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" />
          <i :class="`toggle-password fas ${showPassword ? 'fa-eye':'fa-eye-slash'}`" @click="togglePasswordVisibility"></i>
        </div>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm New Password</label>
        <div class="password-wrapper">
          <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" v-model="confirmPassword" />
          <i :class="`toggle-password fas ${showConfirmPassword ?  'fa-eye':'fa-eye-slash' }`" @click="toggleConfirmPasswordVisibility"></i>
        </div>
      </div>
      <div class="form-group">
        <input
          type="submit"
          class="button primary block"
          :value="loading ? 'Changing...' : 'Change Password'"
          :disabled="loading"
        />
      </div>
    </form>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');

* {
  font-family: 'Nunito', sans-serif;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  color: #192541;
}

h1 {
  color: #192541;
  text-align: center;
  margin-bottom: 20px;
}

.form-widget {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #192541;
}

.form-group input {
  width: 95%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  color: #192541;
}

.form-group input[type="submit"] {
  background-color: #9f8462;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-group input[type="submit"]:hover,
.form-group input[type="submit"]:focus {
  background-color: darken(#9f8462, 10%);
}

.form-group input[type="submit"]:disabled {
  background-color: lighten(#9f8462, 10%);
  cursor: not-allowed;
}

.button.primary.block {
  display: block;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
}
.password-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  cursor: pointer;
  user-select: none;
}
.password-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #192541; /* Adjust the color to match your design */
}

.form-group input[type="password"],
.form-group input[type="text"] {
  padding-right: 40px; /* Adjust padding to prevent text from hiding behind the icon */
}
</style>
