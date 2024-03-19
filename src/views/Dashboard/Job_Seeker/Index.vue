
<script setup>

import {auth} from "@/Composables/auth.js";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import {onMounted, ref} from "vue";
import {reuse} from "@/Composables/reuse.js";
import axios from "axios";
const {authHeader,authUser,base_url,storage} =auth()
const {j_connect_now,j_Connects} =reuse()
const my_connects = ref('')

const   fetchmyConnect = async () => {
  const res= await axios.get(base_url.value+'show_j_connects', authHeader)
  if(res.status === 200){
    my_connects.value = res.data.connects
  }
}
onMounted( ()=>{
  j_Connects()
  fetchmyConnect()
})
</script>

<template>
<Header />
  <div  class="main_contents">
       <div style="height: 100vh;min-height: 100vh;max-height: 100vh;overflow: scroll;" class="ms-4 bg-light">
         <router-view />
       </div>
    <div  class="p-4 connects  d-sm-none d-md-block d-lg-block bg-light">
     <h2 class="text-primary  text-uppercase text-center">My Connects<b class="text-success p-1">{{j_connect_now}}</b></h2>
     <div style="height: 100vh;" class="d-flex flex-column justify-content-center ">

      <div v-for="my_connect in my_connects" :key="my_connect" class="">

        <h2>{{ my_connect.firstName }} {{ my_connect.lastName }}  </h2>
        <p>
          <i style="font-size: 32px;" class="bi bi-telephone-fill"></i>
          {{ my_connect.phone }}
        </p>
        <p>
          <i style="font-size: 32px;" class="bi bi-envelope-at"></i>
          {{ my_connect.email }}
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