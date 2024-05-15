<template>
  <header-nav-bar data-cy="header-nav-bar" />

  <div class="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32" data-cy="information-component">
  <!-- Background Image -->
  <img
    src="../assets/img/footprint.png"
    alt=""
    class="absolute inset-0 -z-10 h-full w-full object-cover object-center"
  />
<!-- Second Image -->
<img
  src="../assets/img/emissions.png"
  alt=""
  class="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 h-auto w-32 md:w-1/3 lg:w-1/4 object-cover"
  style="left: calc(50% + 200px);"
/>

<!-- Third Image -->
<img
  src="../assets/img/the_share_of_the_uks_greenhouse_gas_emissions.png"
  alt=""
  class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 h-auto w-32 md:w-1/3 lg:w-1/4 object-cover"
  style="left: calc(50% + 200px);"
/>




  

    <!-- Gradient Overlay -->
    <div
      class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      aria-hidden="true"
    >
      <div
        class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>

    <!-- Main Content -->
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <!-- Page Heading -->
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl" data-cy="information-title">
          Understanding Carbon Impact & Sustainable Practices
        </h2>

        <!-- Page Content -->
        <p class="mt-6 text-lg leading-8 text-gray-300" data-cy="information-paragraph">
          Carbon dioxide (CO2) emissions from human activities <br> significantly impact our environment and climate. <br> Here's
          what you need to know:
        </p>

        <!-- Impact of Carbon Emissions -->
        <div class="mt-8">
          <h3 class="text-xl font-semibold text-white">Impact of Carbon Emissions</h3>
          <ul class="list-disc list-inside mt-4 text-gray-300">
            <li>Global Climate Change</li>
            <li>Air Pollution</li>
            <li>Ocean Acidification</li>
            <li>Biodiversity Loss</li>
          </ul>
        </div>

        <!-- Sustainable Practices -->
        <div class="mt-8" data-cy="sustainable-practices-section">
          <h3 class="text-xl font-semibold text-white">Sustainable Practices to Reduce Carbon Footprint</h3>
          <ul class="list-disc list-inside mt-4 text-gray-300">
            <li>Renewable Energy</li>
            <li>Energy Efficiency</li>
            <li>Public Transportation</li>
            <li>Plant-Based Diet</li>
            <li>Waste Reduction</li>
            <li>Afforestation</li>
            <li>Policy Advocacy</li>
          </ul>
        </div>

        <!-- Conclusion -->
        <div class="mt-10" data-cy="conclusion-section">
          <p class="text-lg leading-8 text-gray-300">
            By understanding the impact of carbon emissions and adopting sustainable practices, we can work towards a
            healthier planet for current and future generations.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer Component -->
  <footer-component data-cy="footer-component" />
</template>

<script>
import HeaderNavBar from '@/components/AppHeader.vue'
import FooterComponent from '@/components/AppFooter.vue'

export default {
  components: {
    HeaderNavBar,
    FooterComponent
  }
}
</script>
