<template>
  <footer class="relative bg-blueGray-200 pt-8 pb-6">
    <div
      class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
      style="transform: translateZ(0)"
    >
      <svg
        class="absolute bottom-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 2560 100"
        x="0"
        y="0"
      >
        <polygon class="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
      </svg>
    </div>
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap text-center lg:text-left">
        <div class="w-full lg:w-6/12 px-4">
          <h4 class="text-lg mt-0 mb-2 text-white">
            Join us in our mission to reduce carbon footprints and promote sustainable travel
            practices for a greener future
          </h4>
          <div class="mt-6 lg:mb-0 mb-6">
            <button
              class="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <i class="fab fa-twitter"></i>
            </button>
            <button
              class="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <i class="fab fa-facebook-square"></i>
            </button>
            <button
              class="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <i class="fab fa-instagram"></i>
            </button>
            <button
              class="bg-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <i class="fab fa-github"></i>
            </button>
          </div>
        </div>
        <div class="w-full lg:w-6/12 px-4">
          <div class="flex flex-wrap items-top mb-6">
            <div class="w-full lg:w-4/12 px-4 ml-auto">
              <span class="block uppercase text-white text-sm font-semibold mb-2">
                Useful Links
              </span>
              <ul class="list-unstyled">
                <li>
                  <router-link to="/">
                    <a class="text-white hover:text-white font-semibold block pb-2 text-sm" href="">
                      About Us
                    </a>
                  </router-link>
                </li>

                <li>
                  <a
                    class="text-white hover:text-white font-semibold block pb-2 text-sm"
                    href="https://github.com/tomstrong64/MyJourneyFootprint-COM617"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
            <div class="w-full lg:w-4/12 px-4">
              <span class="block uppercase text-white text-sm font-semibold mb-2">
                Other Resources
              </span>
              <ul class="list-unstyled">
                <li>
                  <a class="text-white hover:text-white font-semibold block pb-2 text-sm" href="">
                    MIT License
                  </a>
                </li>
                <li>
                  <router-link to="/">
                    <a class="text-white hover:text-white font-semibold block pb-2 text-sm" href="">
                      Terms & Conditions
                    </a>
                  </router-link>
                </li>

                <li>
                  <router-link to="/">
                    <a class="text-white hover:text-white font-semibold block pb-2 text-sm" href="">
                      Privacy Policy
                    </a>
                  </router-link>
                </li>
                <li>
                  <router-link to="/">
                    <a class="text-white hover:text-white font-semibold block pb-2 text-sm" href="">
                      Contact Us
                    </a>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-6 border-white" />
      <div class="flex flex-wrap items-center md:justify-between justify-center">
        <div class="w-full md:w-4/12 px-4 mx-auto text-center">
          <div class="text-sm text-white font-semibold py-1">
            Copyright © {{ date }}
            <a href="" class="text-white hover:text-white"> </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      date: new Date().getFullYear()
    }
  }
}
</script>
