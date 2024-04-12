
<script setup>

import {auth} from "@/Composables/auth.js";
import {onMounted, ref} from "vue";
import {reuse} from "@/Composables/reuse.js";
const {j_connect_now,j_Connects,my_connects,fetchmyConnect} =reuse()
import axios from "axios";
const {authHeader,authUser,base_url,storage} =auth();
const posts = ref([])
const status = ref('')
const phone = ref('')
const user_id = ref('')
const employer_id = ref('')
const moreDeetails = ref([])
const userDetails = ref([])
const notification = ref([])
const user_notification = ref([])
const employers = ref([])
const employerdetails = ref([])
const referee = ref([])
//
function assignEmployer_id($post){
  employer_id.value=$post
}


const connectEmployer = async () => {
  const formData = new FormData();
  formData.append('employer_id', employer_id.value)
  formData.append('phone', phone.value)
  if(phone.value === '' || phone.value.length<10){
    return status.value= 'Valid phone number required'
  }
  const res = await axios.post(base_url.value + 'job_seeker/connect_employer', formData,authHeader)
  if (res.data.status == 'success'){
    await getPosts()
    await  fetchmyConnect()
    status.value= 'Connection established successfully'
  }
  else {
    status.value = res.data.message
  }
}

const getEmployers = async () => {
  const response = await axios.get(base_url.value+'employers', authHeader);
  if(response.status === 200){
    employers.value=response.data.employers
  }
}
const  showEmployerDetails = async ($data)=>{

  const response = await axios.get(base_url.value+'employer/details/'+$data, authHeader);
  if(response.status === 200){
    employerdetails.value = response.data.employers
    referee.value = response.data.referee
  }
}

const   Notifications   = async () => {
  const res= await axios.get(base_url.value+'j_notifications', authHeader)
  if(res.status === 200){
    notification.value = res.data
    user_notification.value = res.data.notification
  }
}

onMounted(()=>{
  Notifications()
  j_Connects()
  fetchmyConnect()
  getEmployers()
})
</script>

<template>
  <ul class="nav nav-tabs mt-3">
    <li class="nav-item mt-3">
      <router-link to="/j/dashboard/" class="nav-link" aria-current="page">Recently Posted</router-link>
    </li>
    <li class="nav-item mt-3">
      <router-link to="/j/dashboard/best_match" class="nav-link " aria-current="page">Best Matches</router-link>
    </li>
    <li class="nav-item mt-3">
      <router-link to="/j/dashboard/employers" class="nav-link active" aria-current="page">Eployers</router-link>
    </li>

    <li class="nav-item">
          <span  data-bs-target="#notification" data-bs-toggle="modal"  class="position-relative">
        <i style="font-size: 20px" class="fs-2 bi bi-bell-fill"></i>
        <span style="font-size: 20px;padding-left: 1rem; " class="position-absolute ms-4 top-4 start110 translate-middle badge rounded-pill bg-danger">
           {{notification.count}}
        </span>
      </span>

    </li>
  </ul>
  <div class="">

    <div v-if="status" class=" bg-secondary p-4 text-uppercase text-white">{{status}}</div>
    <div class="d-flex">
      <!--    {{posts}}-->
      <div style="width: 65%; height: 100vh;min-height: 100vh;max-height: 100vh;overflow: scroll;" class="ms-4 bg-light">
        <div  class="employers">
            <div class="card pt-1 d-flex flex-column align-items-center" v-for="employer in employers" :key="employer" style="width: 18rem;">
              <img v-if="employer.picture" :src="storage + 'Profiles/' + employer.picture" height="200" width="200" style="border-radius: 50%;" class="" alt="...">
              <img v-else src="/user.png"  height="200" width="200" class="" alt="...">
              <div class="card-body">
                <h5 class="card-title text-center">{{employer.firstName}}  {{employer.lastName}}</h5>
                <div class="p-4 border">
                  <h5>County<span class="text-secondary ms-2">{{employer.county}}</span></h5>
                </div>
                <div class="p-4 border">
                  <h5>Sub county<span class="text-secondary ms-2">{{employer.sub_county}}</span></h5>
                </div>
                <div class="d-flex mt-4 ">
                  <button class="btn btn-success" @click="assignEmployer_id(employer.id)" data-bs-toggle="modal" data-bs-target="#connect" >connect--></button>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div  class="p-4 connects  d-sm-none d-md-block d-lg-block bg-light">
        <h2 class="text-primary  text-uppercase position-fixed text-center">
          My Connects<b class="text-success p-1">{{j_connect_now}}</b>
        </h2>
        <div style="height: 100vh; min-height: 100vh;max-height: 100vh;overflow: scroll; margin-top: 5rem;" class="d-flex flex-column justify-content-start ">

          <div style="border-bottom: 2px solid #ddd" v-for="my_connect in my_connects" :key="my_connect">
            <h2>{{ my_connect.firstName }} {{ my_connect.lastName }}  </h2>
            <p>
              <i style="font-size: 32px;" class="bi bi-telephone-fill"></i>
              {{ my_connect.phone }}
            </p>
            <p>
              <i style="font-size: 32px;" class="bi bi-envelope-at"></i>
              {{ my_connect.email }}
            </p>
            <button class="btn btn-primary float-end mb-2" data-bs-toggle="modal" data-bs-target="#viewMore"  @click="showEmployerDetails(my_connect.id)">View More<i class="bi bi-three-dots-vertical"></i>
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
  <!--  modals-->


  <!-- Modal -->
  <div class="modal fade" id="notification" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Notification</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="table-responsive">

          <table class="table table-bordered border table-striped-columns">
            <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>County</th>
              <th>Picture</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in user_notification" :key="user">
              <td>{{user.firstName}}</td>
              <td>{{user.lastName}}</td>
              <td>{{user.county}}</td>
              <td><img :src="storage + 'Profiles/' + user.picture" width="60" height="60" alt=""></td>
            </tr>
            </tbody>

          </table>
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
        <div class="modal-body">
          <div class="container">

            <div class="p-4 border">
              <h5>Full name<span class="text-secondary ms-2">{{employerdetails.firstName}}{{employerdetails.lastName}}</span></h5>
            </div>
            <div class="p-4 border">
              <h5>County<span class="text-secondary ms-2">{{employerdetails.county}}</span></h5>
            </div>
            <div class="p-4 border">
              <h5>Subcounty<span class="text-secondary ms-2">{{employerdetails.sub_county}}</span></h5>
            </div>
           <h5>Referee details</h5>
            <div class="p-4 border">
              <h5>Subcounty<span class="text-secondary ms-2">{{referee.firstName}}{{referee.lastName}}</span></h5>
              <h5>Relationship<span class="text-secondary ms-2">{{referee.relationship}}</span></h5>
              <h5>County of residents<span class="text-secondary ms-2">{{referee.county}}</span></h5>
            </div>
          </div>
        </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>

  <div class="modal fade" id="connect" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Finish Connecting</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="bg-light " v-if="status"><p style="font-size: 24px;" class="p-1 text-danger">{{status}}</p></div>
          <form @submit.prevent="connectEmployer">
            <p>By paying  ksh 200 you will be able to have full details of the job seeker </p>
            <h5 for="">Enter Your phone </h5>
            <input type="text" class="form-control" required v-model="phone" placeholder="phone eg 0728548760">
            <button type="submit" class="btn btn-primary text-primary text-white float-end my-2">Continue</button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.posts{
  border: 1px solid;
  margin:1.5rem 0rem 1rem 0rem;
  /*height:10rem*/
}
.posts:hover{
  background-color:rgba(12,2,250,.3);
}
.employers{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>