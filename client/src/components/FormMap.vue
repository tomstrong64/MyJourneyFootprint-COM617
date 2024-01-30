<template>
  <div id="container">
    <div id="mapContainer"></div>
    <button @click="clearMarkers">Clear Markers</button>
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
      map: null,
      markers: [],
    };
  },
  methods: {
    setupLeafletMap: function () {
      console.log("Center:", this.center);
      const mapDiv = L.map("mapContainer").setView(this.center, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Copyright Message"
      }).addTo(mapDiv);

      mapDiv.on("click", this.handleMapClick);
      this.map = mapDiv;
    },
    handleMapClick: function (event) {
      if (this.clickCount === 0) {
        console.log("Start Position:", event.latlng);
        this.markers.push(this.addMarker(event.latlng)); // Add marker at the start position and store it
        this.clickCount++;
      } else if (this.clickCount === 1) {
        console.log("End Position:", event.latlng);
        this.markers.push(this.addMarker(event.latlng)); // Add marker at the end position and store it
        this.clickCount++;
      } else {
        alert("You have clicked more than twice. Current click will be used as the start point. Now select the end point.");
        console.log("Start Position:", event.latlng);
        this.clearMarkers();
        this.markers.push(this.addMarker(event.latlng)); // Add marker when restarting and store it
        this.clickCount = 1;
      }
    },
    addMarker: function (latlng) {
      // Create a marker and add it to the map
      return L.marker(latlng).addTo(this.map);
    },
    clearMarkers: function () {
      // Remove all markers from the map and reset the markers array
      this.markers.forEach(marker => this.map.removeLayer(marker));
      this.markers = [];
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
