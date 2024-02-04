<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";

import {user} from "@/Composables/user.js";
const {base_url,authHeader,storage} =user()

const jobseekers = ref([])

const   fetchJobseekers = async () => {
  const res= await axios.get(base_url.value+'show_job_seekers', authHeader)
  if(res.status === 200){
    jobseekers.value = res.data.data
  }
}
onMounted( ()=>{
  fetchJobseekers()
})
</script>

<template>
  <p>Employer Dashboard</p>
  <p>View job seekers</p>
  <div class="row">
    <div class="border-bottom" v-for="user in jobseekers" :key="user">
      name:{{user.lastName}}<br>
      name:{{user.firstName}}<br>
      name:{{user.email}}<br>
      name:{{user.phone}}<br>
    </div>
  </div>
</template>



<style scoped>

</style>