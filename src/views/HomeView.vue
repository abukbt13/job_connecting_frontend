<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header />
  <div class="main container">
      <div class="intro d-flex justify-content-around my-4 py-4">
      <div class="">
        <h1 style="color: rgb(202, 222, 24);">Get Connected <br>Today With Ease</h1>
        <p>Troubled connecting with clients try connect_me
          <br>and you will see significant cost getting connected</p>
        <button style="background-color: rgb(202, 222, 24);font-size: 23px;color: blue;" class="btn">Get Connected Today<i style="font-size: 23px;color: blue;" class="bi bi-plug"></i></button>

      </div>
        <div class="d-flex justify-content-center d-none d-lg-block ">
          <img src="/public/connect.jpg"  srcset="">
      </div>
      </div>
  </div>

     <div class="mid-content row my-4 ">
          <div class="col col-sm-12 col-md-6">
            <h2 class="text-uppercase text-center">Why Connect_Me?</h2>
            <h5 class="text-center">Easy connecting with Clients</h5>
            <p class="text-center" style="color: rgba(205,20,205); font-size: 24px;line-height: 3rem;" >
              You can find a person to hire by seeing their profile
              and requesting more information about the job seeker and also know some of his people.

              By Posting a job job clients can reach you easily for connection
            </p >
          </div>
          <div class="col col-sm-12 col-md-6">
            <h2 class="text-center">Know Clients Info</h2>
            <p class="text-center" style="color: rgba(205,20,205); font-size: 24px;line-height: 3rem;">
              By choosing a certain person you can be able to know more about his or her Geographical location and also viewing the profile information of the client
            </p>
          </div>
     </div>

  <Footer />

</template>
<style>
</style>