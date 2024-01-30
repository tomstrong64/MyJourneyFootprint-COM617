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
    return {
      center: [37.7749, -122.4194],
      clickCount: 0,
    };
  },
  methods: {
    setupLeafletMap: function () {
      console.log("Center:", this.center); // Log the center coordinates
      const mapDiv = L.map("mapContainer").setView(this.center, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Copyright Message"
      }).addTo(mapDiv);
      // Add a click event listener to the map
      mapDiv.on("click", this.handleMapClick);
    },
    handleMapClick: function (event) {
      // Log the clicked coordinates
      if (this.clickCount == 0){
      console.log("Start Position:", event.latlng);
      this.clickCount ++}
      else if (this.clickCount == 1){
      console.log("End Position:", event.latlng);
      this.clickCount ++}
      else{
        alert("You have clicked more than twice. Current click will be used as start point. Now select end point")
        console.log("Start Position:", event.latlng);
        this.clickCount = 1
      }

      // You can store the coordinates in your component's data or perform any other actions here
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.setupLeafletMap();
    });
  },
};
</script>

<style scoped>
#mapContainer {
  width: 70vw;
  height: 90vh;
  position: absolute;
}
</style>
