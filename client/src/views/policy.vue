<template>
  <header-nav-bar />

  <div class="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
    <img
      src="../assets/img/footprint.png"
      alt=""
      class="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
    />
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
    <div
      class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
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
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
         Privacy and Data Protection Policy
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-300">
         We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy and Data Protection Policy explains how we collect, use, store, and protect your personal data, as well as your rights under the General Data Protection Regulation (GDPR).
        </p>
        <h3 class="text-3xl font-bold tracking-tight text-white sm:text-2xl">
            Data Collection and Use 
        </h3>
        <p class="mt-6 text-lg leading-8 text-gray-300">
            At MyJourneyFootprint, we collect information that helps us provide a personalized and efficient service to calculate and manage your travel-related carbon footprint. The types of data we collect include:
            Travel Data: This includes the mode of travel , number of people traveling, journey start and endpoints, and/or journey distance. This data is essential for calculating the carbon emissions associated with your travel.

            User Account Information: When you create an account with us, we collect basic information such as your name, email address, and password. This information helps us to create and manage your account.
        </p>
        <h3 class="text-3xl font-bold tracking-tight text-white sm:text-2xl">
            We Use Your Data
        </h3> 

        <p class="mt-6 text-lg leading-8 text-gray-300"> 
            Carbon Emission Calculations: The primary use of your data is to calculate the total and per-person carbon emissions resulting from your travel. This helps in providing you with accurate insights into your travel-related environmental impact.

            Improvements and Development: We analyze user data in aggregate to understand how our service is used and to identify areas for improvement and development of new features.

            Communication: We may use your contact information to send you updates about our service, including new features and tips for reducing your carbon footprint. You can opt-out of these communications at any time.
        </p>
        <h3 class="text-3xl font-bold tracking-tight text-white sm:text-2xl">
           Data Sharing and Disclosure 
        </h3>

        <p class="mt-6 text-lg leading-8 text-gray-300">
            We do not sell your personal data to third parties. We may share your data with service providers who perform services on our behalf, such as hosting, data analysis, and customer service, under strict confidentiality agreements. Additionally, we may disclose your data if required by law or to protect the rights and safety of our users and ourselves.

            Your data is processed and stored on secure servers, and we employ a range of technical and organizational measures to protect your information from unauthorized access, use, or disclosure.

            Your Rights

            Under the GDPR, you have several rights regarding your personal data, including:

            The right to access your personal data and obtain a copy of it.
            The right to request the correction of inaccurate data.
            The right to request the deletion of your data under certain circumstances.
            The right to object to or restrict the processing of your data.
            The right to data portability, allowing you to obtain and reuse your data for your purposes across different services.
            To exercise any of these rights, please contact us using the contact information provided on our website. We are committed to addressing any requests or concerns regarding your privacy and data protection.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
          <router-link
            class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            to="/calculate"
            >Get started
          </router-link>
          <router-link class="text-sm font-semibold leading-6 text-white" to="/register">
            Sign Up <span aria-hidden="true">→</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <footer-component />
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
