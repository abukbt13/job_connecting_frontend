<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";

import {user} from "@/Composables/user.js";
import Header from "@/components/Header.vue";
import {auth} from "@/Composables/auth.js";
import {reuse} from "@/Composables/reuse.js";
const {base_url,authHeader,storage} =user()
const {authUser} =auth()
const {my_Connects,my_connect_now} =reuse()

const jobseekers = ref([])
const description = ref('')
const status = ref('')
const priority = ref('')
const payment = ref('')
const skills = ref('')
const job_seeker_id = ref('')
const payment_amount = ref('')
const notification = ref([])
const my_posts = ref('')
const my_connects = ref([])

const   fetchJobseekers = async () => {
  const res= await axios.get(base_url.value+'show_job_seekers', authHeader)
  if(res.status === 200){
    jobseekers.value = res.data.data
  }
}
const   fetch_my_posts   = async () => {
  const res= await axios.get(base_url.value+'posts/show_my_posts', authHeader)
  if(res.status === 200){
    my_posts.value = res.data.post
  }
}



const   fetchMyconnects   = async () => {
  const res= await axios.get(base_url.value+'posts/show_my_connects', authHeader)
  if(res.status === 200){
    my_connects.value = res.data.connects
  }
}
const   Notifications   = async () => {
  const res= await axios.get(base_url.value+'e_notifications', authHeader)
  if(res.status === 200){
    notification.value = res.data
  }
}


const createPost = async () => {
  const formData = new FormData();
  formData.append('description', description.value);
  formData.append('priority', priority.value);
  formData.append('payment', payment.value);
  formData.append('skills', skills.value);
  formData.append('payment_amount', payment_amount.value);

  const res = await axios.post(base_url.value + 'post/post_job', formData, authHeader);

  if (res.status === 200) {
    await fetch_my_posts()
    if(res.data.status == 'success') {

      status.value = 'Post created successfully!'

    }
    else {
      status.value= res.data.message;
    }
  } else {
    status.value = 'Error in network try again later!'
  }
}
function assignEmployer_id($post){
  job_seeker_id.value=$post
}

const connectEmployer = async () => {

  const formData = new FormData();
  formData.append('job_seeker_id', job_seeker_id.value)
  const res = await axios.post(base_url.value + 'job_seeker/connect_job_seeker', formData,authHeader)
  status.value= 'Connection established successfully'
  if (res.data.status == 'success'){
    status.value= 'Connection established successfully'
  }
}
onMounted( ()=>{
  my_Connects()
  Notifications()
  authUser()
  fetchJobseekers()
  fetch_my_posts()
  fetchMyconnects()
})
</script>

<template>
  <Header />
  <div  class="my-1 p-2 bg-success text-uppercase text-white text-center" v-if="status">{{status}}</div>
  <div class="d-flex">
      <div class="sidebar">
          <h2 class="text-uppercase text-primary ms-4 mt-3">Dashboard</h2>
        <div class="container"><p class="fs-3">My Connections</p></div>

        <div class="m-4 border-bottom" v-for="my_connect in my_connects" :key="my_connect">

          <p class="fs-4">First Name:{{ my_connect.firstName }} </p>
          <p class="fs-4">Last Name:{{ my_connect.lastName }} </p>
          <p>
            <i style="font-size: 32px;" class="bi bi-telephone-fill"></i>
            {{ my_connect.phone }}
          </p>
          <p>
            <i style="font-size: 32px;" class="bi bi-envelope-at"></i>
            {{  my_connect.email }}
          </p>
        </div>

      </div>
      <div class="menu p-3">
      <div class="">
        <div class="row d-flex w-100">

          <div style=" padding: 1rem;"  class="col-md-4 stretch-card grid-margin">
            <div style="background-color: #f2b722;"  class="card bg-gradient-danger card-img-holder">
              <div class="card-body">
                <h4 class="font-weight-normal mb-3">Notifications <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <h2 class="mb-5">{{notification.count}}</h2>
                <button  data-bs-target="#notification" data-bs-toggle="modal" class="btn btn-primary">View</button>
              </div>
            </div>
          </div>


          <div  style=" padding: 1rem;"  class="col-md-4 stretch-card grid-margin">
            <div style="background-color: #de7af0;"  class="card bg-gradient-info card-img-holder">
              <div class="card-body">
                <h4 class="font-weight-normal mb-3">My Posts <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                </h4>
                <h2 class="mb-5">{{my_posts}}</h2>
                <button data-bs-target="#addpost" data-bs-toggle="modal" class="btn btn-primary float-end position-relative">Add Post<i style="font-size: 20px;" class="bi bi-plus-lg"></i>
                </button>
              </div>
            </div>
          </div>


          <div  style=" padding: 1rem;"  class="col-md-4 stretch-card grid-margin">
            <div style="background-color: #827e74;"  class="card bg-gradient-success card-img-holder">
              <div class="card-body">
                <h4 class="font-weight-normal mb-3">My Connects <i class="mdi mdi-diamond mdi-24px float-right"></i>
                </h4>
                <h2 class="mb-5">{{ my_connect_now }}</h2>
                <button class="btn btn-primary">view</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>




      <div class="bg-light job_seekers p-4">
          <div v-for="user in jobseekers" :key="user" class="card" style="width: 18rem;">
            <img style="border-radius: 30%;padding: 1rem;" :src="storage+user.picture" class="card-img-top" alt="...">
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
                <button class="btn mx-4 my-2 btn-info">More</button>
                <button class="btn mx-4 my-2 btn-success" data-bs-toggle="modal" @click="assignEmployer_id(user.id)" data-bs-target="#connect">Connect</button>
              </div>
            </div>

          </div>

      </div>
    </div>
  </div>


  <div class="modal fade" id="addpost" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Create Post</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="createPost">
          <div class="modal-body">

            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Description</label>
              <textarea  id="" rows="4" class="form-control" v-model="description"></textarea>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Payment Amount</label>
              <input type="number" class="form-control" v-model="payment_amount">
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Payment Mode</label>
              <select v-model="payment" class="form-control">
                <option value="" disabled selected>---select payment---</option>
                <option value="fixed">Fixed</option>
                <option value="negotiable">Negotiable</option>
              </select>

            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Skills needed</label>
              <input type="text" class="form-control" v-model="skills">
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Priority</label>
              <select v-model="priority" class="form-control">
                <option value="" disabled selected>---select payment---</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">low</option>
              </select>
            </div>



          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button  style="background-color: greenyellow;" type="submit"  data-bs-dismiss="modal" class="btn   btn-block text-uppercase">Add Post<i style="font-size" class="bi bi-plus float-end"></i>
            </button>
          </div>
        </form>
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
         <form @submit.prevent="connectEmployer">
           <p>Pay connecting fee of ksh 200 to be fully connected with the job seeker</p>
           <h5 for="">Enter Your phone Number to continue </h5>
           <input type="text" class="form-control" placeholder="phone eg 0728548760">
           <button data-bs-dismiss="modal" class="btn btn-primary text-primary text-white float-end my-2">Continue</button>
         </form>
       </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="notification" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Notification</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
       <p>{{notification}}</p>
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

.sidebar{
  border-right: 2px solid #ddd;

  min-height: 70vh;
  max-height: 80vh;

  overflow: scroll;
  width:27vw;
}
.menu{
  width:100vw;
  height:100vh;
  min-height: 100vh;
  max-height: 100vh;
  overflow: scroll;
}
</style>