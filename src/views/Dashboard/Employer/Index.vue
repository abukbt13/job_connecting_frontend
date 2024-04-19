<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";

import {user} from "@/Composables/user.js";
import Header from "@/components/Header.vue";
import {auth} from "@/Composables/auth.js";
import {reuse} from "@/Composables/reuse.js";
const {base_url,authHeader,storage} =user()
const {authUser} =auth()
const {my_Connects,my_connect_now,fetch_e_Connect,e_connects} =reuse()

const description = ref('')
const status = ref('')
const priority = ref('')
const payment = ref('')
const skills = ref('')
const job_seeker_id = ref('')
const payment_amount = ref('')
const notification = ref([])
const user_notification = ref([])
const my_posts = ref('')
const my_connects = ref([])
const allposts = ref([])

const   fetch_my_posts   = async () => {
  const res= await axios.get(base_url.value+'posts/show_my_posts', authHeader)
  if(res.status === 200){
    my_posts.value = res.data.post
    allposts.value = res.data.myposts
  }
}

const   Notifications   = async () => {
  const res= await axios.get(base_url.value+'e_notifications', authHeader)
  if(res.status === 200){
    notification.value = res.data
    user_notification.value = res.data.notification
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

const showConnects = ref(true);

onMounted( ()=>{
  my_Connects()
  Notifications()
  authUser()
  fetch_my_posts()
  fetch_e_Connect()
})
</script>

<template>
  <Header />
  <div  class="my-1 p-2 bg-success text-uppercase text-white text-center" v-if="status">{{status}}</div>
  <i @click="showConnects = !showConnects" style="color:blue; font-size: 34px; " class="bi sticky-top bi-text-left d-block d-lg-none d-md-none"></i>

  <div class="d-flex">


    <div :class="[showConnects ? 'small' : '', showConnects ? '' : 'd-none']" class="sidebar">

        <div class="container"><p class="fs-3 border-bottom mt-2 text-center">My Connections</p></div>

        <div style="border-bottom: 2px solid #ddf" class="m-4 border-bottom" v-for="my_connect in e_connects" :key="my_connect">

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
          <router-link :to="'/user/more/' + my_connect.employer_id" class="btn mx-4 my-2 btn-info flex-end">More details</router-link>
        </div>

      </div>
      <div class="menu p-3">
      <div class="">
        <div class="row d-flex w-100">

          <div style=" padding: 1rem;"  class="col-md-4 col_sm stretch-card grid-margin">
            <div style="background-color: #f2b722;"  class="card bg-gradient-danger card-img-holder">
              <div class="card-body">
                <h4 class="font-weight-normal mb-3">Notifications <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <h2 class="mb-5">{{notification.count}}</h2>
                <button  data-bs-target="#notification" data-bs-toggle="modal" class="btn btn-primary">View</button>
              </div>
            </div>
          </div>

          <div  style=" padding: 1rem;"  class="col-md-4 col_sm stretch-card grid-margin">
            <div style="background-color: #de7af0;"  class="card bg-gradient-info card-img-holder">
              <div class="card-body">
                <h4 class="font-weight-normal mb-3">My Posts <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                </h4>
                <h2 class="mb-5">{{my_posts}}</h2>
                <button data-bs-target="#viewPosts" data-bs-toggle="modal" class="btn btn-secondary  position-relative">View<i style="font-size: 20px;color:blue;" class="bi bi-eye"></i>
                </button>
                <button data-bs-target="#addpost" data-bs-toggle="modal" class="btn btn-primary float-end position-relative">Add Post<i style="font-size: 20px;" class="bi bi-plus-lg"></i>
                </button>
              </div>
            </div>
          </div>

          <div  style=" padding: 1rem;"  class="col-md-4 col_sm stretch-card grid-margin">
            <div style="background-color: #827e74;"  class="card bg-gradient-success card-img-holder">
              <div class="card-body">
                <h4 class="font-weight-normal mb-3">My Connects <i class="mdi mdi-diamond mdi-24px float-right"></i>
                </h4>
                <h2 class="mb-5">{{ my_connect_now }}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>



        <div class="">
          <router-view />
        </div>


    </div>
  </div>


  <div class="modal fade" id="viewPosts" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">My Posts</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="table-responsive">
          <table class="table table-bordered">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Description</th>
              <th scope="col">Payment Mode</th>
              <th scope="col">Payment Amount</th>
            </tr>
            <tr v-for="allpost in allposts" :key="allpost">
              <td>{{allpost.id}}</td>
              <td><p>{{allpost.description}}  </p></td>
              <td>{{allpost.payment}}</td>
              <td>{{allpost.payment_amount}}</td>
            </tr>
          </table>
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

</template>



<style scoped>

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
@media screen and  (min-width:200px) and (max-width:600px){
  .show{
    display: block;
  }
  .small {
    position:absolute;
    top:4rem;
    left:3rem;
    width: 19rem;
    z-index: 1;
    color:white;
    background: #b342f5;
    min-height: 8rem;
    max-height: 20rem;
    overflow: scroll;
  }
  .col_sm{
    width: 10rem;
  }
}
</style>