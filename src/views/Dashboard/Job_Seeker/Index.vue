
<script setup>

import {auth} from "@/Composables/auth.js";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
const {authHeader,authUser,base_url,storage} =auth()

</script>

<template>
<Header />
  <div  class="d-flex base px-4">
       <div class="left-sidebar">
         <h1>Hi ,Abraham</h1>
         <p class="text-dark"> Connections for you </p>
         <router-view />
       </div>
    <div style="width: 14rem;" class="right-sidebar d-none d-md-block d-lg-block bg-light">
     <h2>My Connects</h2>
    </div>
  </div>


<Footer />

</template>

<style scoped>


</style>