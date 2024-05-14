<template>
  <div>
    <div id="mapContainer"></div>
  </div>
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
      polylines: [], // Store multiple polylines for alternate routes
      osrmBaseUrl: 'https://router.project-osrm.org/route/v1/driving/'
    }
  },
  methods: {
    setupLeafletMap: function () {
      const mapDiv = L.map('mapContainer').setView(this.center, 13)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Copyright Message!'
      }).addTo(mapDiv)

      mapDiv.on('click', this.handleMapClick)
      this.map = mapDiv
    },
    handleMapClick: function (event) {
      const clickedOnPolyline = this.polylines.some((polyline) =>
        polyline.getBounds().contains(event.latlng)
      )

      if (!clickedOnPolyline) {
        // Handle map click only if not clicked on a polyline
        if (this.clickCount === 0 || this.clickCount === 1) {
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
          document.getElementById('startPosForm').innerHTML =
            `Latitude: ${event.latlng.lat}<br> Longitude: ${event.latlng.lng}`
          this.clearMarkers()
          this.markers.push(this.addMarker(event.latlng))
          this.clickCount = 1
        }
      }
    },
    addMarker: function (latlng) {
      return L.marker(latlng).addTo(this.map)
    },
    clearMarkers: function () {
      this.markers.forEach((marker) => this.map.removeLayer(marker))

      this.polylines.forEach((polyline) => this.map.removeLayer(polyline))
      this.polylines = []

      this.markers = []
      this.distance = null
    },
    calculateRoute: function () {
      if (this.markers.length === 2) {
        const startLatLng = this.markers[0].getLatLng()
        const endLatLng = this.markers[1].getLatLng()

        const osrmRequestUrl = `${this.osrmBaseUrl}${startLatLng.lng},${startLatLng.lat};${endLatLng.lng},${endLatLng.lat}?geometries=geojson&alternatives=true`

        fetch(osrmRequestUrl)
          .then((response) => response.json())
          .then((data) => {
            this.displayRoutes(data.routes)
          })
          .catch((error) => console.error('Error fetching OSRM route:', error))
      } else {
        alert('Please select both start and end points before calculating the route.')
      }
    },

    displayRoutes: function (routes) {
      this.polylines.forEach((polyline) => this.map.removeLayer(polyline))
      this.polylines = []

      routes.forEach((route, index) => {
        const routeCoordinates = route.geometry.coordinates
        const color = index === 0 ? 'blue' : 'gray'

        const latLngs = routeCoordinates.map((coord) => L.latLng(coord[1], coord[0]))
        const polyline = L.polyline(latLngs, { color }).addTo(this.map)

        polyline.on('click', () => this.handlePolylineClick(route))

        this.polylines.push(polyline)
      })

      this.distance = routes[0].distance
      document.getElementById('distanceCalc').innerHTML = this.distance / 1000
      console.log('Distance:', this.distance)
    },

    handlePolylineClick: function (route) {
      // Handle click on the polyline (alternate route)
      this.clearMarkers()
      this.displayRoute(route.geometry.coordinates)
      this.distance = route.distance // Set distance for the selected route
      document.getElementById('distanceCalc').innerHTML = this.distance / 1000
    },
    clearRoute: function () {
      // Clear selected route, keeping markers intact
      this.polylines.forEach((polyline) => this.map.removeLayer(polyline))
      this.polylines = []
      this.distance = null
    },

    displayRoute: function (routeCoordinates) {
      const latLngs = routeCoordinates.map((coord) => L.latLng(coord[1], coord[0]))

      // Create new polyline with route coordinates
      const polyline = L.polyline(latLngs, { color: 'blue' }).addTo(this.map)
      this.polylines.push(polyline)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setupLeafletMap()
    })
  }
}
</script>
