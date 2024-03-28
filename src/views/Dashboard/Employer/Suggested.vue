<script setup>


import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/Composables/auth.js";

const {base_url,authHeader,storage} =auth()

const jobseekers = ref([])

const   fetchsuggested = async () => {
  const res= await axios.get(base_url.value+'suggested_job_seekers', authHeader)
  if(res.status === 200){
    jobseekers.value = res.data
  }
}

onMounted( ()=> {
  fetchsuggested()
})
</script>

<template>
  <ul class="nav nav-underline">
    <li class="nav-item">
      <router-link to="/e/dashboard/"  class="nav-link active" aria-current="page">Suggested </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/e/dashboard/all"  class="nav-link" >All</router-link>
    </li>
  </ul>
  <p>Suggested</p>
  {{jobseekers}}
</template>



<style scoped>
.job_seekers {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

@media screen and (max-width: 768px) {
  .job_seekers {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 408px) {
  .job_seekers {
    grid-template-columns: 1fr;
  }
}

</style>