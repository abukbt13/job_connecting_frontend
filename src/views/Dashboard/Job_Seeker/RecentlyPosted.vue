
<script setup>

import {auth} from "@/Composables/auth.js";
import {onMounted, ref} from "vue";
import axios from "axios";
const {authHeader,authUser,base_url,storage} =auth();
const posts = ref([])
const status = ref('')
const user_id = ref('')
const employer_id = ref('')
const moreDeetails = ref([])
const userDetails = ref([])
//
function assignEmployer_id($post){
  employer_id.value=$post
}


    const connectEmployer = async () => {

          const formData = new FormData();
          formData.append('employer_id', employer_id.value)
          const res = await axios.post(base_url.value + 'job_seeker/connect_employer', formData,authHeader)
         if (res.data.status == 'success'){
           status.value= 'Connection established successfully'
         }
         else {
           status.value = res.data.message
         }
     }

  const getPosts = async () => {
    const response = await axios.get(base_url.value+'show_posts', authHeader);
    if(response.status === 200){
      posts.value=response.data.posts
    }
  }
const  showMore = async ($data)=>{
  moreDeetails.value=$data
  user_id.value=$data.user_id
  const response = await axios.get(base_url.value+'e_details/'+user_id.value, authHeader);
  if(response.status === 200){
    userDetails.value=response.data.user
  }
  const res = await axios.get(base_url.value+'create_notification/'+user_id.value, authHeader);

}
onMounted(()=>{
  getPosts()
})
</script>

<template>
  <ul class="nav nav-tabs mt-3">
    <li class="nav-item mt-3">
      <router-link to="/j/dashboard/" class="nav-link active" aria-current="page">Recently Posted</router-link>
    </li>
    <li class="nav-item mt-3">
      <router-link to="/j/dashboard/best_match" class="nav-link " aria-current="page">Best Matches</router-link>
    </li>

    <li class="nav-item mt-3">
      <router-link to="/j/dashboard/saved_connect" class="nav-link " aria-current="page">Saved Jobs</router-link>
    </li>
    <li class="nav-item">
          <span class="position-relative">
        <i style="font-size: 20px" class="fs-2 bi bi-bell-fill"></i>
        <span style="font-size: 20px" class="position-absolute ms-3 top-0 start-110 translate-middle badge rounded-pill bg-danger">
          20 <!-- Your number goes here -->
          <span class="visually-hidden">unread messages</span>
        </span>
      </span>

    </li>
  </ul>

  <div class="">
    <div v-if="status" class=" bg-secondary p-4 text-uppercase text-white">{{status}}</div>
<!--    {{posts}}-->
  <div v-for="post in posts" :key="post" class="posts">
    <div class="px-4 d-flex">
        <div style="max-width: 70%; min-width: 60%;" class="">
          <h2>Description</h2>
          <p>{{post.description}}</p>
        </div>
        <div class="mt-2">
          <h2 class="text-dark">Payment Mode</h2>
          {{post.payment}}
        </div>
    </div>
    <div class="d-flex px-4 pb-3 justify-content-between">
        <div class="">
          <h3 class="text-dark">Payment Details</h3>
          {{post.payment_amount}}
        </div>
      <div class="">
        <div class="me-4 mb-4">
          <button class="btn btn-success mx-4" @click="showMore(post)" data-bs-toggle="modal" data-bs-target="#viewMore" >More Details</button>
          <button class="btn btn-success" @click="assignEmployer_id(post.user_id)" data-bs-toggle="modal" data-bs-target="#connect" >connect Now</button>
        </div>

      </div>
    </div>

  </div>
  </div>

<!--  modals-->


  <!-- Modal -->
  <div class="modal fade" id="viewMore" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">More info</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="container">
              <h4 class="text-center">Description</h4>
              <p class="px-4">{{moreDeetails.description}}</p>

            </div>
          <div class="d-flex justify-content-around">
            <div class="">
              <h5 class="text-center">Payment</h5>
              <p>{{moreDeetails.payment}}</p>
            </div>
            <div class="">
              <p class="text-center">Payment_amount</p>
              <p>{{moreDeetails.payment_amount}}</p>
            </div>

          </div>
          <div class="d-flex justify-content-around">
            <div class="">
              <h5 class="text-center">Priority</h5>
              <p>{{moreDeetails.priority}}</p>
            </div>
            <div class="">
              <p class="text-center">Specific requirement</p>
              <p>{{moreDeetails.specific_requirements}}</p>
            </div>
          </div>
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

  <div class="modal fade" id="connect" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Complete Connecting</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="connectEmployer">
            <p>To get personal details like phone number you need to pay ksh 200 </p>
            <h5 for="">Enter Your phone Number to continue </h5>
            <input type="text" class="form-control" placeholder="phone eg 0728548760">
            <button data-bs-dismiss="modal" class="btn btn-primary text-primary text-white float-end my-2">Continue</button>
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

</style>