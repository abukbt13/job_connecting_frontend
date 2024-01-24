
<script setup>
import {ref} from "vue";
const showProfile = ref(false)
import {useRouter} from "vue-router";

const router = useRouter()

function LogOut(){
  localStorage.removeItem('token')
   router.push('/auth/login/');
}

</script>

<template>
    <nav style="background-color: rgb(202, 222, 24);" class="navbar sticky-top navbar-expand-lg">
      <div class="container-fluid m-auto">
        <router-link class="navbar-brand text-primary" to="/">Niconnect</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item text-primary">
              <router-link class="nav-link active  text-primary" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-primary" to="/dashboard">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-primary" to="/dashboard">Find work</router-link>
            </li>
            <li class="nav-item">
              <img width="50" @click="showProfile = showProfile === false ? true : false" style="border-radius: 50%;" height="50" src="/public/abu.jpg" alt="">
            </li>
            <div  :class="showProfile ? '':'d-none'"    class="showProfile d-flex justify-content-center align-items-center m-2 border p-4">
           <div class="profile">
             <div class="d-flex justify-content-center"><img style="border-radius: 50%;" width="50"  height="50" src="/public/abu.jpg" alt=""></div>
             <p class="text-center text-uppercase">Abraham Kibet</p>
              <p class="text-center text-uppercase">web developer</p>
             <div class="d-flex btn border">
               <button class="button btn btn-sm btn-primary">Active</button>
               <button class="button btn btn-sm btn-light">In active</button>
             </div>
             <i style="font-size: 22px" class="bi bi-gear"> Settings</i>
             <br>
             <i style="font-size: 22px" @click="LogOut()" class="bi bi-box-arrow-left">  Logout</i>
           </div>

            </div>
          </ul>
        </div>
      </div>
    </nav>
</template>

<style scoped>
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
}
</style>