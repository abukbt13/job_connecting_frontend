<script setup>
import Footer from "@/components/Footer.vue";
import {onMounted, ref} from "vue";
const showProfile = ref(false)
import {useRouter} from "vue-router";
import {user} from "@/Composables/user.js"
const {userDetails,details} =user()
const router = useRouter()
const picture= ref('')
const username= ref(null)
username.value=details.firstName
picture.value=details.picture
function LogOut(){
  localStorage.removeItem('token')
  router.push('/auth/login/');
}

onMounted(()=>{
  username.value=details
  userDetails()
})

</script>

<template>
  <nav style="background-color: #d538fc;" class="navbar sticky-top navbar-expand-lg">
    <div class="container-fluid m-auto">
      <router-link class="navbar-brand text-white" to="/">Connect Me</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item text-primary">
            <router-link class="nav-link active  text-white text-uppercase" to="/">Home</router-link>
          </li>
          <div class="d-flex" v-if="username">
            <div v-if="details.role == 'job_seeker'" class="">
              <li class="nav-item text-uppercase">
                <router-link class="nav-link text-white" to="/J/dashboard">Dashboard</router-link>
              </li>
            </div>
            <div v-else-if="details.role == 'employer'" class="">
              <li class="nav-item text-uppercase">
                <router-link class="nav-link text-white" to="/e/dashboard">Dashboard</router-link>
              </li>
            </div>
            <div v-else class="">
              <li class="nav-item text-uppercase">
                <router-link class="nav-link text-white" to="/admin/dashboard">Dashboard</router-link>
              </li>
            </div>

            <li class="nav-item text-uppercase">
              <img width="50" @click="showProfile = showProfile === false ? true : false" style="border-radius: 50%;" height="50"  :src="'http://127.0.0.1:8000/Profiles/'+details.picture"  alt="">
            </li>

          </div>
          <div class="d-flex" v-else>
            <li class="nav-item d-flex justify-content-center align-items-center text-uppercase">
              <router-link to="/auth/login" class="text-decoration-none">LOGIN <i style="font-size: 22px" @click="LogOut()" class="bi bi-box-arrow-right"></i></router-link>
            </li>
            <li class="nav-item d-flex justify-content-center align-items-center text-uppercase">
              <router-link to="/auth/register" class="text-decoration-none">Get Started <i style="font-size: 22px" class="bi bi-pen"></i></router-link>
            </li>
          </div>



          <div  :class="showProfile ? '':'d-none'"    class="showProfile d-flex justify-content-center align-items-center m-2 border p-4">
            <div class="profile" v-if="username">
              <div class="d-flex justify-content-center">
                <img style="border-radius: 50%;" width="50"  height="50"  :src="'http://127.0.0.1:8000/Profiles/'+details.picture"   alt="">
              </div>
              <p class="text-center text-uppercase"> {{details.firstName}} {{details.lastName}}</p>
              <div class="d-flex btn border">
                <button style="background-color: yellow;" class="button btn btn-sm">Active</button>
                <button class="button btn btn-sm btn-light">In active</button>
              </div>
              <router-link to="/user/profile" style="font-size: 23px;" class="text-decoration-none"><i style="font-size: 22px" class="bi bi-gear"> </i>Settings</router-link>

              <br>
              <i style="font-size: 22px" @click="LogOut()" class="bi bi-box-arrow-left">  Logout</i>
            </div>
          </div>

        </ul>
      </div>
    </div>
  </nav>

  <div class="main container">
      <div class="row intro my-2 py-2">
      <div class="col col-md-6 col-lg-6">
        <h1>Get Connected <br>Today With Ease</h1>
        <p>Troubled connecting with clients try connect_me
          <br>and you will see significant cost getting connected</p>
        <router-link to="/auth/register" style="background-color: #3f1be0;font-size: 23px;color: white;" class="btn">Get Connected Today<i style="font-size: 23px;color: blue;" class="bi bi-plug"></i></router-link>

      </div>
        <div class="col d-none d-md-block col-md-6 col-lg-6">
          <div class="d-flex justify-content-center align-items-center">
            <img src="/public/connect.jpg" alt="Connect Image">
          </div>
        </div>

      </div>
  </div>

  <div class="mx-5">

    <h2 class="text-center">Why Connect_Me?</h2>
    <div class="mid-content row my-4">
      <div class="col col-12 col-md-6 col-lg-6">
        <h5 class="text-center text-primary">Easy connecting with Clients</h5>
        <p class="text-center" style="font-size: 24px;line-height: 3rem;">
          By registering in the system both the job seekers and the employers can interact easily through job post by employees or by job seekers taking a more step by requesting more information about the employers at a small fee.
        </p>
      </div>
      <div class="col col-12 col-md-6 col-lg-6">
        <h5 class="text-center text-primary">Know Clients Info</h5>
        <p class="text-center" style="font-size: 24px;line-height: 3rem;">
          By looking at profile picture and few information about the job seeker and also you can know more about the job seeker by paying ksh 200 only. By Posting a job job seekers can reach you easily for connection
        </p>
      </div>
    </div>
  </div>


  <Footer />

</template>
<style>
.showProfile{
  border-radius: 8px;
  background-color: ghostwhite;
  position: absolute;
  right: 2rem;
  top: 2rem;
  height: 18rem;
  width: 14rem;
}
.profile{
  height: 13rem;
  width: 10rem
}
li:hover{
  background: rgb(146, 159, 222);
  color: white;
  cursor: progress;
}
.intro{
  justify-content: right ;
  align-items: center;
  height: 25rem;
}
</style>