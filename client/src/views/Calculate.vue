<template>
  <header-nav-bar />
  <div class="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-15">
    <div
      class="max-w-screen-7xl mx-auto px-4 lg:px-8 flex flex-col sm:flex-row justify-between items-center"
    >
      <!-- Form -->
      <div class="w-full sm:w-1/2 rounded-lg">
        <form
          @submit.prevent="submitForm"
          class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <label for="categorySelect" class="font-medium leading-6 text-white">Travel Mode:</label>
          <select
            v-model="formData.selectedCategory"
            @change="fetchData"
            id="categorySelect"
            class="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded"
            placeholder=""
            required
          >
            <option value="Cars (by market segment)">Car (by Segment)</option>
            <option value="Cars (by size)">Car (by Size)</option>
            <option value="Motorbike">Motorbike</option>
            <option value="Vans">Vans</option>
            <option value="HGV (all diesel)">HGV (all diesel)</option>
            <option value="HGVs refrigerated (all diesel)">HGVs refrigerated (all diesel)</option>
          </select>

          <label class="font-medium leading-6 text-white">{{ formData.selectedCategory }}</label>

          <select v-model="formData.selectedSubcategory" @change="fetchFuelTypes">
            <option
              id="size"
              v-for="vehicle in formData.vehicles"
              :key="vehicle.vehicle_type"
              :value="vehicle.vehicle_type"
            >
              {{ vehicle.vehicle_type }}
            </option>
          </select>

          <select v-model="formData.selectedFuelType" @change="fetchEmissionData">
            <option v-for="fuelType in formData.fuelTypes" :key="fuelType" :value="fuelType">
              {{ fuelType }}
            </option>
          </select>

          <label for="people" class="font-medium leading-6 text-white">Number of People:</label>
          <input
            type="number"
            v-model="formData.numPeople"
            id="people"
            min="1"
            required
            class="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded"
          />

          <label for="start" class="font-medium leading-6 text-white"
            >Journey Start Point (Select on Map):</label
          >
          <div
            id="startPosForm"
            class="block flex-1 border-0 py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded"
          ></div>

          <label for="end" class="font-medium leading-6 text-white"
            >Journey End Point (Select on Map):</label
          >
          <div
            id="endPosForm"
            class="block flex-1 border-0 py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded"
          ></div>

          <label for="distance" class="font-medium leading-6 text-white"
            >Journey Distance (in km):</label
          >
          <input type="number" v-model="formData.distance" id="distance" min="0" />
          <div id="distanceCalc" class="font-medium leading-6 text-white" v-if="!formData.distance">
            Distance will be calculated based on map clicks.
          </div>

          <button
            type="submit"
            class="calculate-button text-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Calculate Carbon Emissions
          </button>
        </form>
        <br />
        <div v-if="emissionTotal !== null">
          <p class="font-medium leading-6 text-white">
            Carbon Emission Total: {{ emissionTotal }} kg CO2
          </p>
        </div>
        <div v-if="emissionsPP !== null">
          <p class="font-medium leading-6 text-white">
            Carbon Emission Per Person: {{ emissionsPP }} kg CO2
          </p>
        </div>
      </div>
      <!-- Map -->
      <div class="sm:w-1/2 mt-6 sm:mt-0">
        <!-- Map component goes here -->
        <div id="map" class="">
          <map-form />
        </div>
      </div>
    </div>
  </div>
  <footer-component />
</template>

<script>
import HeaderNavBar from '@/components/AppHeader.vue'
import FooterComponent from '@/components/AppFooter.vue'
import MapForm from '@/components/MapForm.vue'

export default {
  components: {
    HeaderNavBar,
    FooterComponent,
    MapForm
  },
  data() {
    return {
      formData: {
        selectedCategory: null,
        selectedSubcategory: null,
        selectedFuelType: null,
        vehicles: [],
        fuelTypes: [],

        numPeople: 1,
        start: '',
        end: '',
        distance: '',
        distanceFromMap: ''
      },
      emissionTotal: null,
      emissionsPP: null,
      url: import.meta.env.VITE_API_URL
    }
  },
  computed: {
    showSegmentDropdown() {
      return this.formData.mode === 'Car (by Segment)'
    },
    showSizeDropdown() {
      return this.formData.mode === 'Car (by Size)'
    },
    showTravelClassDropdown() {
      return this.formData.mode === 'Car (by Segment)' || this.formData.mode === 'Car (by Size)'
    },
    showMotorbikeDropdown() {
      return this.formData.mode === 'Motorbike'
    },
    showVanDropdown() {
      return this.formData.mode === 'Vans'
    },
    showHGVDropdown() {
      return this.formData.mode === 'HGV (all diesel)'
    },
    showHGVRefrigeratedDropdown() {
      return this.formData.mode === 'HGVs refrigerated (all diesel)'
    }
  },
  methods: {
    async fetchData() {
      const operationsDoc = `
          query MyQuery {
            emissions(where: {vehicle_activity: {_eq: "${this.formData.selectedCategory}"}}) {
            
              vehicle_type
            }
          }
        `
      try {
        const result = await fetch(`${this.url}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: operationsDoc
          })
        })
        const data = await result.json()
        console.log(data)
        // Extracting unique vehicle types and converting to an array
        const uniqueVehicleTypes = [
          ...new Set(data.data.emissions.map((item) => item.vehicle_type))
        ]
        this.formData.vehicles = uniqueVehicleTypes.map((vehicle_type) => ({ vehicle_type })) // Creating array of objects with vehicle_type property
      } catch (error) {
        console.error('Error:', error)
      }
    },
    async fetchFuelTypes() {
      const operationsDoc = `
      query FuelTypeQuery {
        emissions(where: {vehicle_activity: {_eq: "${this.formData.selectedCategory}"}, vehicle_type: {_eq: "${this.formData.selectedSubcategory}"}}) {
          vehicle_fuel
        }
      }
    `

      try {
        const result = await fetch(`${this.url}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: operationsDoc
          })
        })

        const data = await result.json()
        console.log(data)
        const uniqueFuelTypes = [...new Set(data.data.emissions.map((item) => item.vehicle_fuel))]
        console.log(uniqueFuelTypes)

        this.formData.fuelTypes = [...uniqueFuelTypes]
      } catch (error) {
        console.error('Error:', error)
      }
    },

    async fetchEmissionData() {
      const operationsDoc = `
        query MyQuery {
          emissions(where: {vehicle_activity: {_eq: "${this.formData.selectedCategory}"}, 
                           vehicle_type: {_eq: "${this.formData.selectedSubcategory}"}, 
                           vehicle_fuel: {_eq: "${this.formData.selectedFuelType}"}}) {
            emission
          }
        }
      `
      try {
        const result = await fetch(`${this.url}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: operationsDoc
          })
        })

        const data = await result.json()
        console.log(data)

        // Extract emission data from GraphQL response
        const emissions = data.data.emissions
        if (emissions.length > 0) {
          // If emission data is available, assign it to emissionData property
          this.emissionData = `Emission: ${emissions[0].emission}`
        } else {
          // If no emission data found, display a message
          this.emissionData = 'No emission data available for the selected fuel type.'
        }
      } catch (error) {
        console.error('Error:', error)
        this.emissionData = 'Error fetching emission data. Please try again later.'
      }
    },
    submitForm() {
      // Add logic to handle form submission (e.g., calculate emissions)
      // Access form data using this.formData
      console.log('Form submitted', this.formData)

      this.calculateCarbonEmission()
    },
    updateDropdownOptions() {
      // Reset the carSegment, carSize, and motorbikeType values when the travel mode changes
      this.formData.carSegment = ''
      this.formData.carSize = ''
      this.formData.motorbikeType = ''
    },
    calculateCarbonEmission() {
      // Add your logic to calculate carbon emission using this.formData
      // For example, you can access this.formData.mode, this.formData.distance, etc.
      // Perform calculations and update your application state accordingly
      console.log('Calculating carbon emission...')
      // Your emission calculation logic goes here
      if (this.formData.distance == '') {
        this.formData.distance = document.getElementById('distanceCalc').innerHTML
      }
      console.log('Emission:', this.emissionData)
      console.log('Number of people:', this.formData.numPeople)
      console.log('Distance in calculate.veu :', this.formData.distance)

      // Extract emission value from the string and convert it to a number
      const emissionValue = parseFloat(this.emissionData.split(':')[1].trim())

      this.emissionTotal = emissionValue * this.formData.distance
      this.emissionsPP = this.emissionTotal / this.formData.numPeople
      console.log('emission per person:', this.emissionsPP)
    }
  }
}
</script>

<style scoped>
/* Add your scoped styles here */
</style>
