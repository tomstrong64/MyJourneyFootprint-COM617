<template>
    <div id="container">
      <div id="mapContainer"></div>
    </div>
   </template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
 name: "Map",
 data() {
   return{
     center: [37,7749, -122,4194]
   }},
 methods: {
   setupLeafletMap: function () {
     const mapDiv = L.map("mapContainer").setView(this.center, 13);
     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution: "Copyright Message"}).addTo(mapDiv)

   },
 },
 mounted() {
   this.setupLeafletMap();
 },
};
</script>

<style scoped>
#mapContainer {
 width: 70vw;
 height: 90vh;
 position:absolute;
}
</style>