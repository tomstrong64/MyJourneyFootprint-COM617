<template>
  <header-nav-bar />
  <div class="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
    <div
      class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center"
    >
      <!-- Form -->
      <div class="w-full sm:w-1/2 rounded-lg">
        <form
          @submit.prevent="submitForm"
          class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <label for="mode" class="font-medium leading-6 text-white">Travel Mode:</label>
          <select
            v-model="formData.mode"
            id="mode"
            @change="updateDropdownOptions"
            class="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded"
            placeholder=""
            required
          >
            <option value="Car (by Segment)">Car (by Segment)</option>
            <option value="Car (by Size)">Car (by Size)</option>
            <option value="Motorbike">Motorbike</option>
          </select>

          <label v-if="showSegmentDropdown" for="segment" class="font-medium leading-6 text-white"
            >Car Segment:</label
          >
          <select
            v-if="showSegmentDropdown"
            v-model="formData.carSegment"
            id="segment"
            class="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded"
          >
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

          <label v-if="showSizeDropdown" for="size" class="font-medium leading-6 text-white"
            >Car Size:</label
          >
          <select
            v-if="showSizeDropdown"
            v-model="formData.carSize"
            id="size"
            class="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded"
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Average">Average</option>
          </select>

          <label
            v-if="showMotorbikeDropdown"
            for="motorbikeType"
            class="font-medium leading-6 text-white"
            >Motorbike Type:</label
          >
          <select
            v-if="showMotorbikeDropdown"
            v-model="formData.motorbikeType"
            id="motorbikeType"
            class="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded"
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Average">Average</option>
          </select>

          <label
            v-if="showTravelClassDropdown"
            for="travelClass"
            class="font-medium leading-6 text-white"
            >Travel Class:</label
          >
          <select
            v-if="showTravelClassDropdown"
            v-model="formData.travelClass"
            id="travelClass"
            class="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded"
          >
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="Plug-in Hybrid">Plug-in Hybrid</option>
            <option value="Battery Electric">Battery Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="CNG">CNG</option>
            <option value="LPG">LPG</option>
            <option value="Unknown">Unknown</option>
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

          <label for="distance">Journey Distance (in km):</label>
      <input type="number" v-model="formData.distance" id="distance" min="0">
      <div id="distanceCalc" v-if="!formData.distance">Distance will be calculated based on map clicks.</div>
      

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
        <div id="map">
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
        mode: '',
        carSegment: '',
        carSize: '',
        motorbikeType: '',
        travelClass: '',
        numPeople: 1,
        start: '',
        end: '',
        distance: '',
        distanceFromMap:'',
      },
      emissionTotal: null,
      emissionsPP: null
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
    }
  },
  methods: {
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
      var pplXdist, emissionTotal, emissionsPP
      // Add your logic to calculate carbon emission using this.formData
      // For example, you can access this.formData.mode, this.formData.distance, etc.
      // Perform calculations and update your application state accordingly
      console.log('Calculating carbon emission...')
      // Your emission calculation logic goes here
      if (this.formData.distance == ""){
          this.formData.distance = document.getElementById('distanceCalc').innerHTML
        }
      if (this.formData.mode == 'Car (by Segment)') {
        if (this.formData.carSegment == 'Mini') {
          if (this.formData.travelClass == 'Diesel') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.10607
            var emissionsPP = 0.10607 / this.formData.distance
          } else if (this.formData.travelClass == 'Petrol') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.12962
            var emissionsPP = this.formData.distance / 0.12962
          } else if (this.formData.travelClass == 'Unknown') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.12942
            var emissionsPP = this.formData.distance / 0.12942
          } else if (this.formData.travelClass == 'Plug-in Hybrid') {
            alert('There is no car that fits this spec')
          } else if (this.formData.travelClass == 'Battery Electric') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0
            var emissionsPP = this.formData.distance * 0
          }
        } else if (this.formData.carSegment == 'Supermini') {
          if (this.formData.travelClass == 'Diesel') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.13047
            var emissionsPP = this.formData.distance / 0.13047
          } else if (this.formData.travelClass == 'Petrol') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.14101
            var emissionsPP = this.formData.distance / 0.14101
          } else if (this.formData.travelClass == 'Unknown') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.13966
            var emissionsPP = this.formData.distance / 0.13966
          } else if (this.formData.travelClass == 'Plug-in Hybrid') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.02149
            var emissionsPP = this.formData.distance / 0.02149
          } else if (this.formData.travelClass == 'Battery Electric') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0
            var emissionsPP = this.formData.distance * 0
          }
        } else if (this.formData.carSegment == 'Lower Medium') {
          if (this.formData.travelClass == 'Diesel') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.14178
            var emissionsPP = this.formData.distance / 0.14178
          } else if (this.formData.travelClass == 'Petrol') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.16405
            var emissionsPP = this.formData.distance / 0.16405
          } else if (this.formData.travelClass == 'Unknown') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.15403
            var emissionsPP = this.formData.distance / 0.15403
          } else if (this.formData.travelClass == 'Plug-in Hybrid') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.05933
            var emissionsPP = this.formData.distance / 0.05933
          } else if (this.formData.travelClass == ' Battery Electric') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0
            var emissionsPP = this.formData.distance * 0
          }
        } else if (this.formData.carSegment == 'Upper Medium') {
          if (this.formData.travelClass == 'Diesel') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.15882
            var emissionsPP = this.formData.distance / 0.15882
          } else if (this.formData.travelClass == 'Petrol') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.19143
            var emissionsPP = this.formData.distance / 0.19143
          } else if (this.formData.travelClass == 'Unknown') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.16647
            var emissionsPP = this.formData.distance / 0.16647
          } else if (this.formData.travelClass == 'Plug-in Hybrid') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.06264
            var emissionsPP = this.formData.distance / 0.06264
          } else if (this.formData.travelClass == 'Battery Electric') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0
            var emissionsPP = this.formData.distance * 0
          }
        } else if (this.formData.carSegment == 'Executive') {
          if (this.formData.travelClass == 'Diesel') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.17142
            var emissionsPP = this.formData.distance / 0.17142
          } else if (this.formData.travelClass == 'Petrol') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.21164
            var emissionsPP = this.formData.distance / 0.21164
            alert(emissionTotal)
          } else if (this.formData.travelClass == 'Unknown') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.1812
            var emissionsPP = this.formData.distance / 0.1812
          } else if (this.formData.travelClass == 'Plug-in Hybrid') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.06601
            var emissionsPP = this.formData.distance / 0.06601
          } else if (this.formData.travelClass == 'Battery Electric') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0
            var emissionsPP = this.formData.distance * 0
          }
        } else if (this.formData.carSegment == 'Luxury') {
          if (this.formData.travelClass == 'Diesel') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.20952
            var emissionsPP = this.formData.distance / 0.20952
          } else if (this.formData.travelClass == 'Petrol') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.31741
            var emissionsPP = this.formData.distance / 0.31741
          } else if (this.formData.travelClass == 'Unknown') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.25867
            var emissionsPP = this.formData.distance / 0.25867
            alert(emissionTotal)
          } else if (this.formData.travelClass == 'Plug-in Hybrid') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.08961
            var emissionsPP = this.formData.distance / 0.08961
          } else if (this.formData.travelClass == 'Battery Electric') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0
            var emissionsPP = this.formData.distance * 0
          }
        } else if (this.formData.carSegment == 'Sports') {
          if (this.formData.travelClass == 'Diesel') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.16776
            var emissionsPP = this.formData.distance / 0.16776
          } else if (this.formData.travelClass == 'Petrol') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.23648
            var emissionsPP = this.formData.distance / 0.23648
          } else if (this.formData.travelClass == 'Unknown') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.22533
            var emissionsPP = this.formData.distance / 0.22533
          } else if (this.formData.travelClass == 'Plug-in Hybrid') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.08123
            var emissionsPP = this.formData.distance * 0.08123
          } else if (this.formData.travelClass == 'Battery Electric') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0
            var emissionsPP = this.formData.distance * 0
          }
        } else if (this.formData.carSegment == 'Dual Purpose 4x4') {
          if (this.formData.travelClass == 'Diesel') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.20027
            var emissionsPP = this.formData.distance / 0.20027
          } else if (this.formData.travelClass == 'Petrol') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.20337
            var emissionsPP = this.formData.distance / 0.20337
          } else if (this.formData.travelClass == 'Unknown') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.20129
            var emissionsPP = this.formData.distance / 0.20129
          } else if (this.formData.travelClass == 'Plug-in Hybrid') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.07047
            var emissionsPP = this.formData.distance / 0.07047
          } else if (this.formData.travelClass == 'Battery Electric') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0
            var emissionsPP = this.formData.distance * 0
          }
        } else if (this.formData.carSegment == 'MPV') {
          if (this.formData.travelClass == 'Diesel') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.17492
            var emissionsPP = this.formData.distance / 0.17492
          } else if (this.formData.travelClass == 'Petrol') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.18358
            var emissionsPP = this.formData.distance / 0.18358
          } else if (this.formData.travelClass == 'Unknown') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.17723
            var emissionsPP = this.formData.distance / 0.17723
          } else if (this.formData.travelClass == 'Plug-in Hybrid') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.05625
            var emissionsPP = this.formData.distance / 0.05625
          } else if (this.formData.travelClass == 'Battery Electric') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0
            var emissionsPP = this.formData.distance * 0
          }
        }
      } else if (this.formData.mode == 'Car (by Size)') {
        if (this.formData.carSize == 'Small') {
          if (this.formData.travelClass == 'Diesel') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.13763
            var emissionsPP = this.formData.distance / 0.13763
          } else if (this.formData.travelClass == 'Petrol') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.14012
            var emissionsPP = this.formData.distance / 0.14012
          } else if (this.formData.travelClass == 'Hybrid') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.10049
            var emissionsPP = this.formData.distance / 0.10049
          } else if (this.formData.travelClass == 'Plug-in Hybrid') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.02149
            var emissionsPP = this.formData.distance / 0.02149
          } else if (this.formData.travelClass == 'Battery Electric') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0
            var emissionsPP = this.formData.distance * 0
          } else if (this.formData.travelClass == 'Unknown') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.13936
            var emissionsPP = this.formData.distance / 0.13936
          } else if (this.formData.travelClass == 'CNG') {
            alert('No car with this spec')
          } else if (this.formData.travelClass == 'LPG') {
            alert('No car with this spec')
          }
        } else if (this.formData.carSize == 'Medium') {
          if (this.formData.travelClass == 'Diesel') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.16548
            var emissionsPP = this.formData.distance / 0.16548
          } else if (this.formData.travelClass == 'Petrol') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.17751
            var emissionsPP = this.formData.distance / 0.17751
          } else if (this.formData.travelClass == 'Hybrid') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.10783
            var emissionsPP = this.formData.distance / 0.10783
          } else if (this.formData.travelClass == 'Plug-in Hybrid') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.061
            var emissionsPP = this.formData.distance / 0.061
          } else if (this.formData.travelClass == 'Battery Electric') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0
            var emissionsPP = this.formData.distance * 0
          } else if (this.formData.travelClass == 'Unknown') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.17125
            var emissionsPP = this.formData.distance / 0.17125
          } else if (this.formData.travelClass == 'CNG') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.15447
            var emissionsPP = this.formData.distance / 0.15447
          } else if (this.formData.travelClass == 'LPG') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.17565
            var emissionsPP = this.formData.distance / 0.17565
          }
        } else if (this.formData.carSize == 'Large') {
          if (this.formData.travelClass == 'Diesel') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.20691
            var emissionsPP = this.formData.distance / 0.20691
          } else if (this.formData.travelClass == 'Petrol') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.27156
            var emissionsPP = this.formData.distance / 0.27156
          } else if (this.formData.travelClass == 'Hybrid') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.15101
            var emissionsPP = this.formData.distance / 0.15101
          } else if (this.formData.travelClass == 'Plug-in Hybrid') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.07032
            var emissionsPP = this.formData.distance / 0.07032
          } else if (this.formData.travelClass == 'Battery Electric') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0
            var emissionsPP = this.formData.distance * 0
          } else if (this.formData.travelClass == 'Unknown') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.22469
            var emissionsPP = this.formData.distance / 0.22469
          } else if (this.formData.travelClass == 'CNG') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.23632
            var emissionsPP = this.formData.distance / 0.23632
          } else if (this.formData.travelClass == 'LPG') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.26872
            var emissionsPP = this.formData.distance / 0.26872
          }
        } else if (this.formData.carSize == 'Average') {
          if (this.formData.travelClass == 'Diesel') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.16815
            var emissionsPP = this.formData.distance / 0.16815
          } else if (this.formData.travelClass == 'Petrol') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.16323
            var emissionsPP = this.formData.distance / 0.16323
          } else if (this.formData.travelClass == 'Hybrid') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.11781
            var emissionsPP = this.formData.distance / 0.11781
          } else if (this.formData.travelClass == 'Plug-in Hybrid') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.06542
            var emissionsPP = this.formData.distance / 0.06542
          } else if (this.formData.travelClass == 'Battery Electric') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0
            var emissionsPP = this.formData.distance * 0
          } else if (this.formData.travelClass == 'Unknown') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.16547
            var emissionsPP = this.formData.distance / 0.16547
          } else if (this.formData.travelClass == 'CNG') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.17291
            var emissionsPP = this.formData.distance / 0.17291
          } else if (this.formData.travelClass == 'LPG') {
            var pplXdist = this.formData.distance * this.formData.numPeople
            var emissionTotal = pplXdist * 0.19662
            var emissionsPP = this.formData.distance / 0.19662
          }
        }
      } else {
        if (this.formData.motorbikeType == 'Small') {
          var pplXdist = this.formData.distance * this.formData.numPeople
          var emissionTotal = pplXdist * 0.08094
          var emissionsPP = this.formData.distance / 0.08094
        } else if (this.formData.motorbikeType == 'Medium') {
          var pplXdist = this.formData.distance * this.formData.numPeople
          var emissionTotal = pplXdist * 0.09826
          var emissionsPP = this.formData.distance / 0.09826
        } else if (this.formData.motorbikeType == 'Large') {
          var pplXdist = this.formData.distance * this.formData.numPeople
          var emissionTotal = pplXdist * 0.13072
          var emissionsPP = this.formData.distance / 0.13072
        } else if (this.formData.motorbikeType == 'Average') {
          var pplXdist = this.formData.distance * this.formData.numPeople
          var emissionTotal = pplXdist * 0.11138
          var emissionsPP = this.formData.distance / 0.11138
        }
      }
      this.emissionTotal = emissionTotal
      this.emissionsPP = emissionsPP
    }
  }
}
</script>

<style scoped>
/* Add your scoped styles here */
</style>
