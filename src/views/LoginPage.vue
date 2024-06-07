<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      <form @submit.prevent="login" class="mt-8 space-y-6">
        <div>
          <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
                 class="block w-full rounded-md shadow-sm py-3 px-4 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 placeholder="Email address">
        </div>
        <div>
          <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required
                 class="block w-full rounded-md shadow-sm py-3 px-4 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-4"
                 placeholder="Password">
        </div>
        <div>
          <button type="submit"
                  class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6">
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    login() {
      if (this.email === 'test@test.com' && this.password === 'test') {
        localStorage.setItem('authenticated', 'true')
        this.$router.push({ name: 'HomePage' })
      } else {
        this.error = 'Invalid email or password'
      }
    }
  }
}
</script>
