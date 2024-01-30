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
      this.calculateCarbonEmission();
    },
    updateDropdownOptions() {
      // Reset the carSegment, carSize, and motorbikeType values when the travel mode changes
      this.formData.carSegment = '';
      this.formData.carSize = '';
      this.formData.motorbikeType = '';
    },
    calculateCarbonEmission() {
    var pplXdist, emissionTotal, emissionsPP;
    // Add your logic to calculate carbon emission using this.formData
    // For example, you can access this.formData.mode, this.formData.distance, etc.
    // Perform calculations and update your application state accordingly
    console.log('Calculating carbon emission...');
    // Your emission calculation logic goes here

    if (this.formData.mode == "Car (by Segment)"){
      if (this.formData.carSegment == "Mini"){
        if (this.formData.travelClass == "Diesel"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist * 0.10607 
        var emissionsPP = this.formData.distance * 0.10607 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Petrol"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *   0.12962 
        var emissionsPP = this.formData.distance *   0.12962 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Unknown"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *   0.12942 
        var emissionsPP = this.formData.distance *   0.12942 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Plug-in Hybrid"){
        alert("There is no car that fits this spec")
        } else if (this.formData.travelClass == "Battery Electric"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist * 0 
        var emissionsPP = this.formData.distance * 0
        alert(emissionTotal)
        }
      }  else if (this.formData.carSegment == "Supermini"){
        if (this.formData.travelClass == "Diesel"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *   0.13047 
        var emissionsPP = this.formData.distance *   0.13047  
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Petrol"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist * 0.14101  
        var emissionsPP = this.formData.distance * 0.14101 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Unknown"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *     0.13966 
        var emissionsPP = this.formData.distance *   0.13966 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Plug-in Hybrid"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *   0.02149   
        var emissionsPP = this.formData.distance *   0.02149  
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Battery Electric"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist * 0 
        var emissionsPP = this.formData.distance * 0
        alert(emissionTotal)
        }
      } else if (this.formData.carSegment == "Lower Medium"){
        if (this.formData.travelClass == "Diesel"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *   0.14178  
        var emissionsPP = this.formData.distance *   0.14178   
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Petrol"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *   0.16405  
        var emissionsPP = this.formData.distance *  0.16405 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Unknown"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *   0.15403  
        var emissionsPP = this.formData.distance *   0.15403  
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Plug-in Hybrid"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *     0.05933  
        var emissionsPP = this.formData.distance *   0.05933  
        alert(emissionTotal)
        } else if (this.formData.travelClass == " Battery Electric"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist * 0 
        var emissionsPP = this.formData.distance * 0
        alert(emissionTotal)
        }
      } else if (this.formData.carSegment == "Upper Medium"){
        if (this.formData.travelClass == "Diesel"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.15882 
        var emissionsPP = this.formData.distance *  0.15882   
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Petrol"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.19143  
        var emissionsPP = this.formData.distance *  0.19143 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Unknown"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.16647  
        var emissionsPP = this.formData.distance *  0.16647   
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Plug-in Hybrid"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *   0.06264 
        var emissionsPP = this.formData.distance *  0.06264 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Battery Electric"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist * 0 
        var emissionsPP = this.formData.distance * 0
        alert(emissionTotal)
        }
      } else if (this.formData.carSegment == "Executive"){
        if (this.formData.travelClass == "Diesel"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.17142  
        var emissionsPP = this.formData.distance *  0.17142   
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Petrol"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *   0.21164  
        var emissionsPP = this.formData.distance *  0.21164 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Unknown"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.1812   
        var emissionsPP = this.formData.distance *  0.1812   
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Plug-in Hybrid"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.06601  
        var emissionsPP = this.formData.distance *  0.06601   
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Battery Electric"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist * 0 
        var emissionsPP = this.formData.distance * 0
        alert(emissionTotal)
        }
      } else if (this.formData.carSegment == "Luxury"){
        if (this.formData.travelClass == "Diesel"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.20952  
        var emissionsPP = this.formData.distance *  0.20952   
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Petrol"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.31741 
        var emissionsPP = this.formData.distance *  0.31741 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Unknown"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.25867  
        var emissionsPP = this.formData.distance *  0.25867  
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Plug-in Hybrid"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.08961 
        var emissionsPP = this.formData.distance *  0.08961 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Battery Electric"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist * 0 
        var emissionsPP = this.formData.distance * 0
        alert(emissionTotal)
        }
      } else if (this.formData.carSegment == "Sports"){
        if (this.formData.travelClass == "Diesel"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.16776  
        var emissionsPP = this.formData.distance *  0.16776   
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Petrol"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.23648  
        var emissionsPP = this.formData.distance *  0.23648 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Unknown"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.22533  
        var emissionsPP = this.formData.distance *  0.22533 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Plug-in Hybrid"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.08123  
        var emissionsPP = this.formData.distance *  0.08123   
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Battery Electric"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist * 0 
        var emissionsPP = this.formData.distance * 0
        alert(emissionTotal)
        }
      } else if (this.formData.carSegment == "Dual Purpose 4x4"){
        if (this.formData.travelClass == "Diesel"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.20027  
        var emissionsPP = this.formData.distance *  0.20027   
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Petrol"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.20337  
        var emissionsPP = this.formData.distance *  0.20337 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Unknown"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.20129   
        var emissionsPP = this.formData.distance *  0.20129  
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Plug-in Hybrid"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.07047 
        var emissionsPP = this.formData.distance *  0.07047  
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Battery Electric"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist * 0 
        var emissionsPP = this.formData.distance * 0
        alert(emissionTotal)
        }
      } else if (this.formData.carSegment == "MPV"){
        if (this.formData.travelClass == "Diesel"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.17492 
        var emissionsPP = this.formData.distance *0.17492
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Petrol"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.18358  
        var emissionsPP = this.formData.distance *  0.18358 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Unknown"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.17723 
        var emissionsPP = this.formData.distance *  0.17723  
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Plug-in Hybrid"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.05625  
        var emissionsPP = this.formData.distance *  0.05625  
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Battery Electric"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist * 0 
        var emissionsPP = this.formData.distance * 0
        alert(emissionTotal)
        }
      }
    } else if (this.formData.mode == "Car (by Size)"){
      if (this.formData.carSize == "Small"){
        if (this.formData.travelClass == "Diesel"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *    0.13763 
        var emissionsPP = this.formData.distance *  0.13763 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Petrol"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.14012   
        var emissionsPP = this.formData.distance *  0.14012 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Hybrid"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.10049 
        var emissionsPP = this.formData.distance *  0.10049  
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Plug-in Hybrid"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *0.02149  
        var emissionsPP = this.formData.distance *0.02149
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Battery Electric"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist * 0 
        var emissionsPP = this.formData.distance * 0
        alert(emissionTotal)
        }
        else if (this.formData.travelClass == "Unknown"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist * 0.13936
        var emissionsPP = this.formData.distance *0.13936
        alert(emissionTotal)
        }else if (this.formData.travelClass == "CNG"){
        alert("No car with this spec")
        }else if (this.formData.travelClass == "LPG"){
          alert("No car with this spec")
        }
      } else if (this.formData.carSize == "Medium"){
        if (this.formData.travelClass == "Diesel"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.16548  
        var emissionsPP = this.formData.distance *  0.16548 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Petrol"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.17751  
        var emissionsPP = this.formData.distance *  0.17751  
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Hybrid"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.10783 
        var emissionsPP = this.formData.distance *  0.10783  
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Plug-in Hybrid"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *0.06100
        var emissionsPP = this.formData.distance *0.06100
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Battery Electric"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist * 0 
        var emissionsPP = this.formData.distance * 0
        alert(emissionTotal)
        }
        else if (this.formData.travelClass == "Unknown"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *0.17125
        var emissionsPP = this.formData.distance *0.17125
        alert(emissionTotal)
        }else if (this.formData.travelClass == "CNG"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.15447
        var emissionsPP = this.formData.distance *  0.15447
        alert(emissionTotal)
        }else if (this.formData.travelClass == "LPG"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *0.17565
        var emissionsPP = this.formData.distance *0.17565
        alert(emissionTotal)
        }
      } else if (this.formData.carSize == "Large"){
        if (this.formData.travelClass == "Diesel"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.20691  
        var emissionsPP = this.formData.distance *  0.20691  
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Petrol"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.27156   
        var emissionsPP = this.formData.distance *  0.27156 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Hybrid"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.15101 
        var emissionsPP = this.formData.distance *  0.15101  
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Plug-in Hybrid"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *0.07032
        var emissionsPP = this.formData.distance *0.07032
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Battery Electric"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist * 0 
        var emissionsPP = this.formData.distance * 0
        alert(emissionTotal)
        }
        else if (this.formData.travelClass == "Unknown"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *0.22469
        var emissionsPP = this.formData.distance *0.22469
        alert(emissionTotal)
        }else if (this.formData.travelClass == "CNG"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.23632
        var emissionsPP = this.formData.distance *  0.23632
        alert(emissionTotal)
        }else if (this.formData.travelClass == "LPG"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *0.26872
        var emissionsPP = this.formData.distance *0.26872
        alert(emissionTotal)
        }
      } else if (this.formData.carSize == "Average"){
        if (this.formData.travelClass == "Diesel"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.16815  
        var emissionsPP = this.formData.distance *  0.16815  
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Petrol"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.16323  
        var emissionsPP = this.formData.distance *  0.16323 
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Hybrid"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.11781 
        var emissionsPP = this.formData.distance *  0.11781  
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Plug-in Hybrid"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *0.06542
        var emissionsPP = this.formData.distance *0.06542
        alert(emissionTotal)
        } else if (this.formData.travelClass == "Battery Electric"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist * 0 
        var emissionsPP = this.formData.distance * 0
        alert(emissionTotal)
        }
        else if (this.formData.travelClass == "Unknown"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *0.16547
        var emissionsPP = this.formData.distance *0.16547
        alert(emissionTotal)
        }else if (this.formData.travelClass == "CNG"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *  0.17291
        var emissionsPP = this.formData.distance *  0.17291
        alert(emissionTotal)
        }else if (this.formData.travelClass == "LPG"){
          var pplXdist = this.formData.distance * this.formData.numPeople
        var emissionTotal = pplXdist *0.19662
        var emissionsPP = this.formData.distance *0.19662
        alert(emissionTotal)        }
      }
    } else {
      if (this.formData.carSize == "Small"){
        
      } else if (this.formData.carSize == "Medium"){
        
      } else if (this.formData.carSize == "Large"){
        
      } else if (this.formData.carSize == "Average"){
        
      }
    }
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



 
 






