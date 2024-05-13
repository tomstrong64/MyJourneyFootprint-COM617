<template>
  <div class="container mx-auto px-24 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-6/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-white text-sm font-bold">Sign up with</h6>
            </div>
            <hr class="mt-6 border-b-1 border-white" />
          </div>
          <div class="btn-wrapper text-center">
            <button
              class="bg-white active:bg-blueGray-50 text-black font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
              type="button"
            >
              <img alt="..." class="w-5 mr-1" :src="google" />
              Google
            </button>
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-white text-center mb-3 font-bold">
              <small>Or sign up with credentials</small>
            </div>
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-white text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Name
                </label>
                <input
                  v-model="name"
                  type="text"
                  class="border-0 px-3 py-3 placeholder-white text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Name"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-white text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  v-model="email"
                  type="email"
                  class="border-0 px-3 py-3 placeholder-white text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-white text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  v-model="password"
                  type="password"
                  class="border-0 px-3 py-3 placeholder-white text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div>

              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    class="form-checkbox border-0 rounded text-white ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span class="ml-2 text-sm font-semibold text-white">
                    I agree with the
                    <a href="javascript:void(0)" class="text-emerald-500"> Privacy Policy </a>
                  </span>
                </label>
              </div>

              <div class="text-center mt-6 bg-indigo-600">
                <button
                  class="bg-blueGray-800 text-white active:bg-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  @click="register"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import google from '@/assets/img/google.svg'

export default {
  data() {
    return {
      name: '', // Added this property
      email: '',
      password: '',
      google,
      url: import.meta.env.VITE_API_URL
    }
  },
  methods: {
    async register() {
      try {
        const response = await fetch(`${this.url}/user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password
          })
        })

        if (response.ok) {
          alert('Registration successful')
          //redirect to login
          this.$router.push('/login')
        } else {
          alert('Registration failed')
        }
      } catch (error) {
        console.error('Registration error:', error)
      }
    }
  }
}
</script>
