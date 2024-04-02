
<script setup>
import Header from "@/views/Header.vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import {auth} from "@/Composables/auth.js";
import Jobseeker_Index from "@/views/Dashboard/Job_Seeker/Index.vue";
import Employee from "@/views/Dashboard/Employer/Index.vue";
const {authHeader,authUser,base_url,storage} =auth()
const details=ref(null)
const role=ref('')
const   userDetails = async () => {
  const res= await axios.get(base_url.value+'user', authHeader)
  if(res.status === 200){
    details.value=res.data
    role.value=res.data.role
  }
}

onMounted(()=>{
  authUser()
  userDetails()
})
</script>
<template>

<div class="">
  <Header />
  <p>Dashboard</p>
</div>

</template>


<style scoped>

</style>