
<script setup>

import {auth} from "@/Composables/auth.js";
import {onMounted, ref} from "vue";
import axios from "axios";
const {authHeader,authUser,base_url,storage} =auth();
const posts = ref([])
const status = ref('')
const employer_id = ref('')
const moreDeetails = ref([])
//
function assignEmployer_id($post){
  employer_id.value=$post
}
    const connectEmployer = async () => {

      const formData = new FormData();
      formData.append('employer_id', employer_id.value)
      const res = await axios.post(base_url.value + 'job_seeker/connect', formData,authHeader)
      status.value= 'Connection established successfully'
     if (res.data.status == 'success'){
       status.value= 'Connection established successfully'
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
}
onMounted(()=>{
  getPosts()
})
</script>

<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link to="/jobs/dashboard/" class="nav-link active" aria-current="page">Recently Posted</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/jobs/dashboard/best_match" class="nav-link " aria-current="page">Best Matches</router-link>
    </li>

    <li class="nav-item">
      <router-link to="/jobs/dashboard/saved_connect" class="nav-link " aria-current="page">Saved Jobs</router-link>
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
          <h2 class="text-dark">Payment Details</h2>
          {{post.payment}}
        </div>
    </div>
    <div class="d-flex px-4 pb-3 justify-content-between">
        <div class="">
          <h3 class="text-dark">Payment Details</h3>
          {{post.payment}}
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
<!--          {{moreDeetails}}-->
          Description:{{moreDeetails.description}}<br>
          Payment:{{moreDeetails.payment}}<br>
          Payment_amount:{{moreDeetails.payment_amount}}<br>
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