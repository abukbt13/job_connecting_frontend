
<script setup>

</script>
<template>

  <div class="">
    <div class="row bg-dark my-2">
      <div class="col px-4">
        <h2 class="text-primary">Follow Us on</h2>
       <i style="font-size:30px; background-color: yellow;color: blue" class="bi  border rounded-5 mx-2 p-1 rounded-5 bi-facebook"></i>
        <i style="font-size:30px; background-color: yellow;color: blue" class="bi border rounded-5 mx-2 p-1  bi-twitter"></i>
        <i style="font-size:30px; background-color: yellow;color: blue" class="bi border rounded-5 mx-2 p-1  bi-youtube"></i>
        <i style="font-size:30px; background-color: yellow;color: blue" class="bi border rounded-5 mx-2 p-1  bi-instagram"></i>

      </div>
      <div class="col">
        <h3 class="text-primary">Quick Links</h3>
        <ul class="list-unstyled">
          <li class="py-2"><router-link class="text-decoration-none" to="login">Help and Support</router-link></li>
          <li class="py-2"><router-link  class="text-decoration-none" to="register">About Us</router-link></li>
         <li class="py-2"><router-link  class="text-decoration-none" to="dashboard">Dashboard</router-link></li>
        </ul>
      </div>
      <div class="col">
        <h3 class="text-primary text-primary">Contact us through</h3>
        <p class="p-2 text-white">Email : info@finetectsolutions@gmail.com</p>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>