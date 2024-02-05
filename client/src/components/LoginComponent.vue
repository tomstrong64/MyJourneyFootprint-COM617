<template>
  <div>
    <div>
      <label for="username">Username:</label>
      <input id="username" v-model="username" />
    </div>

    <div>
      <label for="password">Password:</label>
      <input id="password" type="password" v-model="password" />
    </div>

    <div>
      <input id="checkbox" type="checkbox" v-model="checkboxChecked" />
      <label for="checkbox">I accept the privacy policy</label>
    </div>

    <div>
      <button id="loginbutton" @click="login">Login</button>
    </div>

    <div>
      <p id="error-message1" hidden>Please fill in all details</p>
      <p id="error-message2" hidden>Username is required</p>
      <p id="error-message3" hidden>Password is required</p>
      <p id="error-message4" hidden>>Username or password incorrect</p>
      <p id="error-message5" hidden>Please accept the privacy policy</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      checkboxChecked: false,
      errorMessages: []
    }
  },
  methods: {
    async login() {
      this.errorMessages = [] // Reset error messages
      if (!this.username || !this.password) {
        this.errorMessages.push('Please fill in all details')
        return
      }

      if (!this.username) {
        this.errorMessages.push('Username is required')
      }

      if (!this.password) {
        this.errorMessages.push('Password is required')
      }

      // Simulate API call
      if (this.username === 'incorrectUser' || this.password === 'incorrectPassword') {
        throw new Error('Username or password incorrect')
      }

      // Simulate successful login
      if (this.username === 'validUser' && this.password === 'validPassword') {
        this.$emit('login-success', 'Login successful')
      }
    },
    openPrivacyPage() {
      // Simulate opening privacy page
      this.$emit('privacy-page-opened', 'Privacy Policy Page')
    },
    async handleCheckboxClick() {
      // Simulate checkbox click handling
      this.$emit('checkbox-clicked', 'Checkbox clicked successfully')
    }
  }
}
</script>
