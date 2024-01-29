<template>
  <form @submit.prevent="submitForm">
    <label for="mode">Travel Mode:</label>
    <select v-model="formData.mode" id="mode" @change="updateDropdownOptions" required>
      <option value="Car (by Segment)">Car (by Segment)</option>
      <option value="Car (by Size)">Car (by Size)</option>
      <option value="Motorbike">Motorbike</option>
      <!-- Add more options as needed -->
    </select>

    <label v-if="showSegmentDropdown" for="segment">Car Segment:</label>
    <select v-if="showSegmentDropdown" v-model="formData.carSegment" id="segment">
      <option value="Mini">Mini</option>
      <option value="Supermini">Supermini</option>
      <option value="Lower Medium">Lower Medium</option>
      <option value="Upper Medium">Upper Medium</option>
      <option value="Executive">Executive</option>
      <option value="Luxury">Luxury</option>
      <option value="Sports">Sports</option>
      <option value="Dual Purpose 4x4">Dual Purpose 4x4</option>
      <option value="MPV">MPV</option>
    </select>

    <label v-if="showSizeDropdown" for="size">Car Size:</label>
    <select v-if="showSizeDropdown" v-model="formData.carSize" id="size">
      <option value="Small">Small</option>
      <option value="Medium">Medium</option>
      <option value="Large">Large</option>
      <option value="Average">Average</option>
    </select>

    <label v-if="showMotorbikeDropdown" for="motorbikeType">Motorbike Type:</label>
    <select v-if="showMotorbikeDropdown" v-model="formData.motorbikeType" id="motorbikeType">
      <option value="Small">Small</option>
      <option value="Medium">Medium</option>
      <option value="Large">Large</option>
      <option value="Average">Average</option>
    </select>


    <label v-if="showTravelClassDropdown" for="travelClass">Travel Class:</label>
    <select v-if="showTravelClassDropdown" v-model="formData.travelClass" id="travelClass">
      <option value="Diesel">Diesel</option>
      <option value="Petrol">Petrol</option>
      <option value="Plug-in Hybrid">Plug-in Hybrid</option>
      <option value="Battery Electric">Battery Electric</option>
      <option value="Hybrid">Hybrid</option>
      <option value="CNG">CNG</option>
      <option value="LPG">LPG</option>
      <option value="Unknown">Unknown</option>
      <!-- Add more options as needed for each class -->
    </select>

    <label for="people">Number of People:</label>
    <input type="number" v-model="formData.numPeople" id="people" required>

    <label for="start">Journey Start Point:</label>
    <input type="string" v-model="formData.start" id="start" required>

    <label for="end">Journey End Point:</label>
    <input type="string" v-model="formData.end" id="end" required>


    <label for="distance">Journey Distance (in km):</label>
    <input type="number" v-model="formData.distance" id="distance" required>

    <button type="submit" class="calculate-button">Calculate Carbon Emissions</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        mode: 'Car (by Segment)',
        carSegment: '',
        carSize: '',
        motorbikeType: '', 
        travelClass: '',
        numPeople: 1,
        start: '',
        end: '',
        distance: 0,
      },
    };
  },
  computed: {
    showSegmentDropdown() {
      return this.formData.mode === 'Car (by Segment)';
    },
    showSizeDropdown() {
      return this.formData.mode === 'Car (by Size)';
    },
    showTravelClassDropdown() {
      return this.formData.mode === 'Car (by Segment)' || this.formData.mode === 'Car (by Size)';
    },
    showMotorbikeDropdown() {
      return this.formData.mode === 'Motorbike';
    },
  },
  methods: {
    submitForm() {
      // Add logic to handle form submission (e.g., calculate emissions)
      // Access form data using this.formData
      console.log('Form submitted', this.formData);
    },
    updateDropdownOptions() {
      // Reset the carSegment, carSize, and motorbikeType values when the travel mode changes
      this.formData.carSegment = '';
      this.formData.carSize = '';
      this.formData.motorbikeType = '';
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
form {
  max-width: 400px;
  margin: 0 auto;
}

label {
  display: block;
  margin-bottom: 8px;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
}

.calculate-button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px;
  cursor: pointer;
}
</style>



 
 






