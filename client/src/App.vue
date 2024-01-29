
<template>
  <div id="app">
    <div id="form"><TravelForm /></div>
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
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

