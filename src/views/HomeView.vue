<script setup>
import {ref} from "vue";

const token = localStorage.getItem("token");
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div v-if="token" class="">
    <Header />
  </div>
  <div v-else class="">
    <nav style="background-color: #d538fc;" class="navbar sticky-top navbar-expand-lg">
      <div class="container-fluid m-auto">
        <router-link class="navbar-brand text-white" to="/">Connect Me</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item text-primary">
              <router-link class="nav-link active  text-white text-uppercase" to="/auth/login">Login</router-link>
            </li>
            <li class="nav-item text-primary">
              <router-link class="nav-link active  text-white text-uppercase" to="/auth/register">Register</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>

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
.intro{
  justify-content: right ;
  align-items: center;
  height: 25rem;
}
</style>