
<script setup>
import {user} from "@/Composables/user.js";
const {base_url,storage,details,userDetails} =user()
import Header from "@/components/Header.vue";
import {onMounted} from "vue";
onMounted(()=>{
  userDetails()
  Header
})
</script>
<template>
  <Header />
  <div class="container">
<!--    <div class="row">-->
<!--      <div class="col col-sm-12 col-md-5 col-lg-5">-->
<!--        <h2>Personal Details</h2>-->
<!--        <div class="card" style="width: 100%;">-->

<!--          <div class="card-body">-->
<!--            <div class="d-flex">-->
<!--              <div class="">-->
<!--                <img src="/public/abu.jpg"   height="200" width="200" class="" alt="...">-->
<!--              </div>-->
<!--              <div class="ms-2">-->

<!--                 <h2>First Name </h2>-->
<!--                <p>{{details.firstName}}</p>-->
<!--                <h2>First Name </h2>-->
<!--                <p>{{details.lastName}}</p>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="d-flex">-->
<!--              <div class="">-->
<!--                <h2>Email </h2>-->
<!--                <p>{{details.email}}</p>-->
<!--                <h2>Phone</h2>-->
<!--                <p>{{details.phone}}</p>-->
<!--              </div>-->
<!--              <div class="ms-2">-->

<!--                <h2>Gender </h2>-->
<!--                <p>{{details.gender}}Male</p>-->
<!--                <h2>Phone</h2>-->
<!--                <p>{{details.phone}}</p>-->
<!--              </div>-->
<!--            </div>-->


<!--          <button class="btn btn-primary">Edit Profile</button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="col col-sm-12 col-md-5 col-lg-5">-->
<!--        <h2>Referees details</h2>-->
<!--      </div>-->
<!--    </div>-->
  </div>
  {{details}}

</template>



<style scoped>

</style>