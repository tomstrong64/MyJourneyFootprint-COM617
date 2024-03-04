<template>
  <div class="container mx-auto px-4 pt-6 h-full">
    <div class="flex content-center items-center justify-center h-full rounded-lg">
      <div class="w-full lg:w-4/12 px-4 bg-white rounded-lg">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-black-300 text-sm font-bold">Sign in</h6>
            </div>

            <hr class="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-black-300 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-black-300 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span class="ml-2 text-sm font-semibold text-black-300"> Remember me </span>
                </label>
              </div>

              <div class="text-center mt-6">
                <button
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex flex-wrap mt-6 relative">
          <div class="w-1/2">
            <a href="javascript:void(0)" class="text-black-300">
              <small>Forgot password?</small>
            </a>
          </div>
          <div class="w-1/2 text-right">
            <router-link to="/register" class="text-black">
              <small>Create new account</small>
            </router-link>
          </div>
          <div class="mt-12 justify-center text-xs text-gray-600">
            <p>
              By clicking “Sign In” above, you acknowledge that you have read, understood, and agree
              to MyJourneyFootPrint's
              <router-link to="/">
                <a class="text-blue-400" target="_blank">Terms &amp; Conditions</a>
              </router-link>
              , and
              <router-link to="/">
                <a class="text-blue-400" target="_blank" rel="”noopener”">Privacy Policy</a>
              </router-link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import github from '@/assets/img/github.svg'
import google from '@/assets/img/google.svg'

export default {
  data() {
    return {
      github,
      google
    }
  }
}
</script>
