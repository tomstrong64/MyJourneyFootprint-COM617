<template>
  <div id="app">
    
    <h1>Calculate Carbon Emissions for Your Journey</h1>
    <br><br><br><br><br><br>
    <div id="form" class="section"><TravelForm /></div>
    <div id="map"><FormMap/></div>   
  </div>
</template>


<script>
import TravelForm from "@/components/TravelForm.vue";
import FormMap from "@/components/FormMap.vue"

export default {
  components: {
    TravelForm,
    FormMap,
  },
};
</script>

<style>
/* Add your global styles here */
</style>

<style scoped>

#map{
  margin-left: 80px;
}
.section {
  flex: 1; /* Make each section take up equal space */
}

#form {
  width: 100%; /* Make sure the content inside takes full width */
  padding: 20px;
  margin: 10px;
  border: 2px solid #4a60dc; /* Add border color */
  border-radius: 8px; /* Add border radius for rounded corners */
  background-color: rgb(95, 156, 93); /* Set background color for each section */
}

@media (max-width: 767px) {
  #app {
    flex-direction: column; /* Stack sections vertically on smaller screens */
  }
}
</style>