<template>
    <div>
      <div>
        <label for="start-point">Starting Point:</label>
        <input id="start-point" v-model="startPoint" />
      </div>
  
      <div>
        <label for="end-point">End Point:</label>
        <input id="end-point" v-model="endPoint" />
      </div>
  
      <div>
        <label for="mode">Transportation Mode:</label>
        <select id="mode" v-model="transportationMode">
          <option value="Car">Car</option>
          <option value="Bus">Bus</option>
          <option value="Bicycle">Bicycle</option>
        </select>
      </div>
  
      <div>
        <label for="people">Number of People:</label>
        <input id="people" type="number" v-model="numberOfPeople" />
      </div>
  
      <div>
        <button id="calculate-button" @click="calculate">Calculate</button>
      </div>
  
      <div>
        <button id="toggle-metrics-button" @click="toggleMetrics">Toggle Metrics</button>
      </div>
  
      <div>
        <button id="use-location-button" @click="useLocation">Use My Location</button>
      </div>
  
      <div>
        <p id="error-message1" hidden>Please provide a starting point</p>
      <p id="error-message2" hidden>Please provide an end point</p>
      <p id="error-message3" hidden>Please provide starting and ending points</p>
      <p id="error-message4" hidden>>Please select a transportation mode</p>
      <p id="error-message5" hidden>Number of people must be 1 or more</p>
      <p id="error-message6" hidden>Please provide the number of people</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        startPoint: '',
        endPoint: '',
        transportationMode: '',
        numberOfPeople: 0,
        metrics: 'miles',
        error1: '',
        error2: '',
        error3: '',
        error4: '',
        error5: '',
        error6: '',
        successMessage: '',
      };
    },
    methods: {
      calculate() {
        if (!this.startPoint) {
          this.error1 = 'Please provide a starting point';
        } else {
          this.error1 = '';
        }
  
        if (!this.endPoint) {
          this.error2 = 'Please provide an end point';
        } else {
          this.error2 = '';
        }
  
        if (!this.startPoint && !this.endPoint) {
          this.error3 = 'Please provide starting and ending points';
        } else {
          this.error3 = '';
        }
  
        if (!this.transportationMode) {
          this.error4 = 'Please select a transportation mode';
        } else {
          this.error4 = '';
        }
  
        if (this.numberOfPeople < 1) {
          this.error5 = 'Number of people must be 1 or more';
        } else {
          this.error5 = '';
        }
  
        if (!this.numberOfPeople && this.transportationMode) {
          this.error6 = 'Please provide the number of people';
        } else {
          this.error6 = '';
        }
  
        // Assuming a successful emission calculation API call
        if (!this.error1 && !this.error2 && !this.error3 && !this.error4 && !this.error5 && !this.error6) {
          this.successMessage = `Emission calculated successfully. Value: ${this.calculateEmission()}`;
        }
      },
      calculateEmission() {
        // Mock function to calculate emission
        // Replace this with your actual emission calculation logic
        return 50;
      },
      toggleMetrics() {
        this.metrics = this.metrics === 'miles' ? 'km' : 'miles';
      },
        useLocation() {
            // Simulate using user's location
            this.startPoint = 'Current Location';
        },
    },
    };
  </script>
  