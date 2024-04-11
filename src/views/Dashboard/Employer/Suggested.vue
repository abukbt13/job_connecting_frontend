
<script setup>

import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/Composables/auth.js";

const {base_url,authHeader,storage} =auth()

const jobseekers = ref([])
const job_seeker_id = ref('')
const status = ref('')
const user_id = ref('')
const phone = ref('')
const moreDeetails = ref([])
const userDetails = ref([])

const   fetchsuggested = async () => {
  const res= await axios.get(base_url.value+'suggested_job_seekers', authHeader)
  if(res.status === 200){
    jobseekers.value = res.data.job_seekers
  }
}

function assignEmployer_id($post){
  job_seeker_id.value=$post
}

const  showMore = async ($data)=>{
  moreDeetails.value=$data
  user_id.value=$data.id
  const response = await axios.get(base_url.value+'j_details/'+user_id.value, authHeader);
  if(response.status === 200){
    userDetails.value=response.data.user
  }
  const res = await axios.get(base_url.value+'notify_user/'+user_id.value, authHeader);

}

const connectEmployer = async () => {

  const formData = new FormData();
  formData.append('job_seeker_id', job_seeker_id.value)
  formData.append('phone', phone.value)
  if(phone.value === '' || phone.value.length<10){
    return status.value= 'Valid phone number required'
  }
  const res = await axios.post(base_url.value + 'job_seeker/connect_job_seeker', formData,authHeader)
  if (res.data.status == 'success'){
    status.value= 'Connection established successfully'
  }
}

onMounted( ()=> {
  fetchsuggested()
})
</script>


<template>
  <ul class="nav nav-underline">
    <ul class="nav nav-underline">
      <li class="nav-item">
        <router-link to="/e/dashboard/"  class="nav-link active" aria-current="page">Suggested job seekers</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/e/dashboard/all"  class="nav-link">All job seekers</router-link>
      </li>
    </ul>
  </ul>

  <div class="text-uppercase fs-1 text-info" v-if="status">{{status}}</div>

  <div class="bg-light job_seekers p-4">
    <div v-for="user in jobseekers" :key="user" class="card" style="width: 18rem;">
      <img style="border-radius: 30%;padding: 1rem;" v-if="user.picture" :src="storage+'Profiles/'+user.picture" class="card-img-top" alt="no image">
      <img style="border-radius: 30%;padding: 1rem;" v-else src="/user.png" class="card-img-top" alt="Avatar">

      <div class="card-body">
        <div class="d-flex">
          <div class="">
            <h5>Name</h5>
            <p>{{user.firstName}} {{user.lastName}}</p>
          </div>
          <div class="ms-4">
            <h5>Gender</h5>
            <p style="font-size: 20px;" class="card-text">Male</p>
          </div>
        </div>
        <div class="d-flex">
          <div class="">
            <h5>County</h5>
            <p>{{user.county}}</p>
          </div>
          <div class="ms-4">
            <h5>Sub County</h5>
            <p style="font-size: 20px;" class="card-text">{{user.sub_county}}</p>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <button class="btn mx-4 my-2 btn-info" @click="showMore(user)" data-bs-target="#viewMore" data-bs-toggle="modal">More details</button>
          <button class="btn mx-4 my-2 btn-success" data-bs-toggle="modal" @click="assignEmployer_id(user.id)" data-bs-target="#connect">Connect</button>
        </div>
      </div>

    </div>

  </div>
  <div class="modal fade" id="connect" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Connect with Jobseeker</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <div class=" text-info" v-if="status">{{status}}</div>

          <form @submit.prevent="connectEmployer">
            <p>Pay connecting fee of ksh 200 to be fully connected with the job seeker</p>
            <h5 for="">Enter Your phone Number to continue </h5>
            <input type="text" class="form-control"  v-model="phone" placeholder="phone eg 0728548760">
            <button class="btn btn-primary text-primary text-white float-end my-2">Continue</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="viewMore" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">More info</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <h3 class="text-center">About the employer</h3>
        <div class="d-flex">
          <div class="p-4">
            <h5>Full Name <span class="text-secondary ms-2">{{ userDetails.firstName }}</span></h5>
            <h5>County<span class="text-secondary ms-2">{{ userDetails.county }}</span></h5>
          </div>
          <div class="p-4">
            <h5>Subcounty<span class="text-secondary ms-2">{{ userDetails.sub_county }}</span></h5>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

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