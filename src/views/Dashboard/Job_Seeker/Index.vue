
<script setup>

import {auth} from "@/Composables/auth.js";
const {authHeader,authUser,base_url,storage} =auth()

</script>

<template>
<div class="container">
  <h1>Hi ,Abraham</h1>
  <p class="text-dark"> Jobs recommended for you</p>
  <router-view />
</div>



</template>

<style scoped>

</style>