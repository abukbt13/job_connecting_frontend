
<script setup>

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
        <form action="submit_contact.php" method="post">
          <label for="name">Name:</label><br>
          <input type="text" id="name" name="name" required><br><br>

          <label for="email">Email:</label><br>
          <input type="email" id="email" name="email" required><br><br>

          <label for="message">Message:</label><br>
          <textarea id="message" name="message" rows="4" required></textarea><br><br>

          <input type="submit" value="Submit">
        </form>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>