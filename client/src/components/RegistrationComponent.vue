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
      <button id="registerbutton" @click="register">Register</button>
    </div>

    <div>
      <a id="privacy-link" @click="openPrivacyPage">Privacy Policy</a>
    </div>

    <div>
      <p id="error-message1" hidden>Please fill in all details</p>
      <p id="error-message2" hidden>Username is required</p>
      <p id="error-message3" hidden>Password is required</p>
      <p id="error-message4" hidden>Please accept the privacy policy</p>
      <p id="error-message5" hidden>Username and password must meet minimum character limits</p>
      <p id="error-message6" hidden>Username already taken</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      checkboxChecked: false
    }
  },
  methods: {
    async register() {
      // Simulate API call
      if (this.username === 'existingUser') {
        throw new Error('Username already taken')
      }
  
      // Simulate successful registration
      // return { status: 201 };
      this.$emit('registration-success', 'Registration successful')
    },
    openPrivacyPage() {
      // Simulate opening privacy page
      this.$emit('privacy-page-opened', 'Privacy Policy Page')
    },
    handleCheckboxClick() {
      // Simulate checkbox click handling
      this.$emit('checkbox-clicked', 'Checkbox clicked successfully')
    }
  }
}
</script>
