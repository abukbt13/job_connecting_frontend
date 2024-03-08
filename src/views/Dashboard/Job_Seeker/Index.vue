
<script setup>

import {auth} from "@/Composables/auth.js";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
const {authHeader,authUser,base_url,storage} =auth()

</script>

<template>
<Header />
  <div  class="main_contents">
       <div style="height: 100vh;min-height: 100vh;max-height: 100vh;overflow: scroll;" class="ms-4 bg-light">
         <h1>Hi ,Abraham</h1>
         <p class="text-dark"> Connections for you </p>
         <router-view />
       </div>
    <div  class="p-4 connects  d-sm-none d-md-block d-lg-block bg-light">
     <h2 class="text-primary  text-uppercase text-center">My Connects<b class="text-success p-1">4</b></h2>
     <div style="height: 100vh;" class="d-flex justify-content-center ">

      <div class="">
        <h2>Adam Fondo</h2>
        <p>
          <i style="font-size: 32px;" class="bi bi-telephone-fill"></i>
          0746014945
        </p>
        <p>
          <i style="font-size: 32px;" class="bi bi-envelope-at"></i>
            abukbt13@gmail.com
        </p>
      </div>

     </div>
    </div>

    <i style="right: 0.5rem; margin-top:0.5rem; font-size: 33px;" class="bi bg-primary bi-justify-right position-absolute position-fixed  d-sm-block d-md-none d-lg-none" @click="showMore">more</i>

  </div>


<Footer />

</template>

<style scoped>
.main_contents{
  display:flex;
}
.connects{
  width:40rem;
  background-color: #9eeaf9;
}

</style>