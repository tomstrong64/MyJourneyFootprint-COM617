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
    map: null,
    markers: [],
    distance: null,
    polyline: null,
    labelIconMarker: null, // to store the marker for the label icon
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
        document.getElementById("startPosForm").innerHTML = `Latitude: ${event.latlng.lat}<br> Longitude: ${event.latlng.lng}`
        this.markers.push(this.addMarker(event.latlng));
        this.clickCount++;
      } else if (this.clickCount === 1) {
        console.log("End Position:", event.latlng);
        document.getElementById("endPosForm").innerHTML = `Latitude: ${event.latlng.lat}<br> Longitude: ${event.latlng.lng}`
        this.markers.push(this.addMarker(event.latlng));
        this.clickCount++;
        this.calculateDistance()
        document.getElementById("distanceCalc").innerHTML = `${this.distance.toFixed(2)} KM`
      } else {
        alert("You have clicked more than twice. Current click will be used as the start point. Now select the end point.");
        console.log("Start Position:", event.latlng);
        document.getElementById("startPosForm").innerHTML = `Latitude: ${event.latlng.lat}<br> Longitude: ${event.latlng.lng}`
        this.clearMarkers();
        this.markers.push(this.addMarker(event.latlng));
        this.clickCount = 1;
      }
    },
    addMarker: function (latlng) {
      return L.marker(latlng).addTo(this.map);
    },
    clearMarkers: function () {
  this.markers.forEach(marker => this.map.removeLayer(marker));

  if (this.polyline) {
    this.map.removeLayer(this.polyline);
    this.polyline = null;
  }

  if (this.labelIconMarker) {
    this.map.removeLayer(this.labelIconMarker);
    this.labelIconMarker = null;
    this.labelIcon = null;
  }

  this.markers = [];
  this.distance = null; // Reset distance when markers are cleared
},
    calculateDistance: function () {
      // Check if there are exactly two markers (start and end points)
      if (this.markers.length === 2) {
    const startLatLng = this.markers[0].getLatLng();
    const endLatLng = this.markers[1].getLatLng();
    this.distance = this.haversineDistance(startLatLng, endLatLng)
    

    // Create or update the polyline
    if (this.polyline) {
      this.polyline.setLatLngs([startLatLng, endLatLng]);
    } else {
      this.polyline = L.polyline([startLatLng, endLatLng], { color: 'red' }).addTo(this.map);
    }

    // Calculate midpoint
    const midLatLng = L.latLng([
      (startLatLng.lat + endLatLng.lat) / 2,
      (startLatLng.lng + endLatLng.lng) / 2,
    ]);

    // Create or update the label icon
    const labelText = `${this.distance.toFixed(2)} km`;
    if (this.labelIconMarker) {
      this.labelIconMarker.setLatLng(midLatLng);
      this.labelIconMarker.bindTooltip(labelText).openTooltip();
    } else {
      this.labelIcon = L.divIcon({
        className: 'label-icon',
        html: `<div>${labelText}</div>`,
      });

      this.labelIconMarker = L.marker(midLatLng, {
        icon: this.labelIcon,
        interactive: false, // Prevent click events on this marker
      }).addTo(this.map);
    }
  } else {
    alert("Please select both start and end points before calculating the distance.");
  }
    },
    haversineDistance: function (latlng1, latlng2) {
      const toRadians = value => (value * Math.PI) / 180;
      const earthRadius = 6371; // Earth radius in kilometers

      const lat1 = toRadians(latlng1.lat);
      const lon1 = toRadians(latlng1.lng);
      const lat2 = toRadians(latlng2.lat);
      const lon2 = toRadians(latlng2.lng);

      const dLat = lat2 - lat1;
      const dLon = lon2 - lon1;

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return earthRadius * c;
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
  width: 65vw;
  height: 70vh;
  position: absolute;
}


button {
  margin-top: 10px;
}
</style>
<style>
.label-icon {
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  color: rgb(207, 25, 70);
  background-color: red;
  border-radius: 5px;
  padding: 5px;
}
</style>
