<template>
  <div id="mapContainer"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
export default {
  name: 'Map',
  data() {
    return {
      center: [50.908249, -1.400638],
      clickCount: 0,
      map: null,
      markers: [],
      distance: null,
      polyline: null,
      labelIconMarker: null, // to store the marker for the label icon
      osrmBaseUrl: 'https://router.project-osrm.org/route/v1/driving/'
    }
  },
  methods: {
    setupLeafletMap: function () {
      console.log('Center:', this.center)
      const mapDiv = L.map('mapContainer').setView(this.center, 13)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Copyright Message'
      }).addTo(mapDiv)

      mapDiv.on('click', this.handleMapClick)
      this.map = mapDiv
    },
    handleMapClick: function (event) {
      if (this.clickCount === 0 || this.clickCount === 1) {
        console.log('Position:', event.latlng)
        const posText = `Latitude: ${event.latlng.lat}<br> Longitude: ${event.latlng.lng}`
        this.markers.push(this.addMarker(event.latlng))

        if (this.clickCount === 0) {
          document.getElementById('startPosForm').innerHTML = posText
        } else {
          document.getElementById('endPosForm').innerHTML = posText
          this.calculateRoute()
        }

        this.clickCount++
      } else {
        alert(
          'You have clicked more than twice. Current click will be used as the start point. Now select the end point.'
        )
        console.log('Start Position:', event.latlng)
        document.getElementById('startPosForm').innerHTML =
          `Latitude: ${event.latlng.lat}<br> Longitude: ${event.latlng.lng}`
        this.clearMarkers()
        this.markers.push(this.addMarker(event.latlng))
        this.clickCount = 1
      }
    },
    addMarker: function (latlng) {
      return L.marker(latlng).addTo(this.map)
    },
    clearMarkers: function () {
      this.markers.forEach((marker) => this.map.removeLayer(marker))

      if (this.polyline) {
        this.map.removeLayer(this.polyline)
        this.polyline = null
      }

      if (this.labelIconMarker) {
        this.map.removeLayer(this.labelIconMarker)
        this.labelIconMarker = null
      }

      this.markers = []
      this.distance = null // Reset distance when markers are cleared
    },
    calculateRoute: function () {
      if (this.markers.length === 2) {
        const startLatLng = this.markers[0].getLatLng()
        const endLatLng = this.markers[1].getLatLng()

        const osrmRequestUrl = `${this.osrmBaseUrl}${startLatLng.lng},${startLatLng.lat};${endLatLng.lng},${endLatLng.lat}?geometries=geojson`

        fetch(osrmRequestUrl)
          .then((response) => response.json())
          .then((data) => {
            const routeCoordinates = data.routes[0].geometry.coordinates
            this.distance = data.routes[0].distance
            document.getElementById('distanceCalc').innerHTML = this.distance / 1000
            this.displayRoute(routeCoordinates)
          })
          .catch((error) => console.error('Error fetching OSRM route:', error))
      } else {
        alert('Please select both start and end points before calculating the route.')
      }
    },

    displayRoute: function (routeCoordinates) {
      // Remove existing polyline
      if (this.polyline) {
        this.map.removeLayer(this.polyline)
      }

      // Convert coordinates to LatLng objects
      const latLngs = routeCoordinates.map((coord) => L.latLng(coord[1], coord[0]))

      // Create new polyline with route coordinates
      this.polyline = L.polyline(latLngs, { color: 'blue' }).addTo(this.map)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setupLeafletMap()
    })
  }
}
</script>
