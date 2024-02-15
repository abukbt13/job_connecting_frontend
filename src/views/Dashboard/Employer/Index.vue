<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";

import {user} from "@/Composables/user.js";
const {base_url,authHeader,storage} =user()

const jobseekers = ref([])
const description = ref('')
const status = ref('')
const priority = ref('')
const payment = ref('')
const skills = ref('')
const payment_amount = ref('')

const   fetchJobseekers = async () => {
  const res= await axios.get(base_url.value+'show_job_seekers', authHeader)
  if(res.status === 200){
    jobseekers.value = res.data.data
  }
}


const createPost = async () => {
  const formData = new FormData();
  formData.append('description', description.value);
  formData.append('priority', priority.value);
  formData.append('payment', payment.value);
  formData.append('skills', skills.value);
  formData.append('payment_amount', payment_amount.value);

  const res = await axios.post(base_url.value + 'post_job', formData, authHeader);

  if (res.status === 200) {
    if(res.data.status == 'success') {
      status.value = 'Post created successfully!'
    }
    else {
      status.value= res.data;
    }
  } else {
    status.value = 'Error in network try again later!'
  }
}
onMounted( ()=>{
  fetchJobseekers()
})
</script>

<template>
  <div class="d-flex">
    <div class="" v-if="status">{{status}}</div>
    <div class="sidebar">
      <h2 class="text-uppercase text-primary ms-4 mt-3">Dashboard</h2>
      <hr>
    <div class="ms-4">
      <button data-bs-toggle="modal" data-bs-target="#addpost" class="btn btn-success my-2">Create job Post</button>
      <button class="btn btn-success my-2">My Job Posts</button>
      <button class="btn btn-success my-2">My  Wish list</button>
      <button class="btn btn-success my-2">My Connects</button>
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
                <h2 class="mb-5">50</h2>
                <button class="btn btn-primary">View</button>
              </div>
            </div>
          </div>
          <div  style=" padding: 1rem;"  class="col-md-4 stretch-card grid-margin">
            <div style="background-color: #de7af0;"  class="card bg-gradient-info card-img-holder">
              <div class="card-body">
                <h4 class="font-weight-normal mb-3">My Posts <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                </h4>
                <h2 class="mb-5">45</h2>
                <button class="btn btn-primary">Create a Job post</button>
              </div>
            </div>
          </div>
          <div  style=" padding: 1rem;"  class="col-md-4 stretch-card grid-margin">
            <div style="background-color: #827e74;"  class="card bg-gradient-success card-img-holder">
              <div class="card-body">
                <h4 class="font-weight-normal mb-3">My Connects <i class="mdi mdi-diamond mdi-24px float-right"></i>
                </h4>
                <h2 class="mb-5">95</h2>
                <button class="btn btn-primary">view</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="bg-light job_seekers p-4">
          <div v-for="user in jobseekers" :key="user" class="card" style="width: 18rem;">
            <img src="/abu.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <div class="d-flex border-bottom">
                <div class="">

                  <h5>Name</h5>
                  <p style="font-size: 20px;" class="card-text">
                    {{user.lastName}}
                    {{user.firstName}}
                  </p>
                </div>
                <div class="ms-4">
                  <h5>County</h5>
                  <h6 class="card-text">Meru </h6>
                </div>
              </div>

              <div class="d-flex">
                <div class="">
                  <h5>Sub County</h5>
                  <p style="font-size: 20px;" class="card-text">Kitale</p>
                </div>
                <div class="ms-4">
                  <h5>Gender</h5>
                  <p style="font-size: 20px;" class="card-text">Male</p>
                </div>
              </div>
            </div>
            <button class="btn mx-4 my-2 btn-info">Connect Now </button>
          </div>
      </div>
    </div>
  </div>

  //Modals
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
              <input type="text" class="form-control" v-model="description">
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Payment Amount</label>
              <input type="number" class="form-control" v-model="payment_amount">
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Payment</label>
              <input type="number" class="form-control" v-model="payment">
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Skills needed</label>
              <input type="text" class="form-control" v-model="skills">
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Priority</label>
              <input type="text" class="form-control" v-model="priority">
            </div>



          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button  style="background-color: greenyellow;" type="submit"  data-bs-dismiss="modal" class="btn   btn-block text-uppercase">Add Referee<i style="font-size" class="bi bi-plus float-end"></i>
            </button>
          </div>
        </form>
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
  background-color:cornflowerblue;
  height:100vh;
  width:20vw;
}
.menu{
  width:100vw;
}
</style>