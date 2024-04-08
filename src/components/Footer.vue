
<script setup>
import axios from "axios";
import {ref} from "vue";
import {auth} from "@/Composables/auth.js";
const {base_url} =auth();
const name = ref('')
const email = ref('')
const message = ref('')
const status = ref('')

const saveInquiry = async () => {
  const formData = new FormData();
  formData.append('email', email.value)
  formData.append('name', name.value)
  formData.append('message', message.value)
  const res = await axios.post(base_url.value + 'inquire', formData)
  if(res.status == 200){
    if (res.data.status == 'success'){
      status.value= 'Message sent successfully '
      alert("message sent successfully")
    }
    else {
      status.value = res.data.message
    }
  }else {
    status.value = 'Error in the network connection'
  }

}
</script>
<template>

  <div class="ps-4">
    <div style="background-color: #d538fc; justify-content: space-between" class="row  my-2 py-4">
      <div class="col-12 col-md-4 col-lg-4">
        <h2 class="">Follow Us on</h2>
       <i style="font-size:30px; background-color: yellow;color: blue" class="bi  border rounded-5 mx-2 p-1 rounded-5 bi-facebook"></i>
        <i style="font-size:30px; background-color: yellow;color: blue" class="bi border rounded-5 mx-2 p-1  bi-twitter"></i>
        <i style="font-size:30px; background-color: yellow;color: blue" class="bi border rounded-5 mx-2 p-1  bi-youtube"></i>
        <i style="font-size:30px; background-color: yellow;color: blue" class="bi border rounded-5 mx-2 p-1  bi-instagram"></i>

      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <h3 class="">Quick Links</h3>
        <ul class="list-unstyled">
          <li class="py-2"><router-link  class="text-decoration-none text-white" to="/auth/login">Login</router-link></li>
          <li class="py-2"><router-link  class="text-decoration-none text-white" to="/auth/register">Register</router-link></li>
         <li class="py-2"><router-link  class="text-decoration-none text-white" to="dashboard">Dashboard</router-link></li>
        </ul>
        <router-link to="/about_us" class="btn bg-primary text-white text-decoration-none" >About us</router-link>
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <h3 class="">Contact us</h3>
        <form @submit.prevent="saveInquiry" method="post">
          <label for="name">Name:</label><br>
          <input type="text"  v-model="name" required><br><br>

          <label for="email">Email:</label><br>
          <input type="email" v-model="email"  required><br><br>

          <label for="message">Message:</label><br>
          <textarea id="message" v-model="message" rows="4" required></textarea><br><br>

          <input type="submit" value="Submit">
        </form>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>