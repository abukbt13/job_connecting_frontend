
<script setup>
import Header from "@/components/header.vue"
import {ref} from "vue";
const isSidebarOpen = ref(false)

</script>

<template>
 <Header />
<div class="container">
  <h1>Hi ,Abraham</h1>
  <p class="text-dark"> Jobs recommended for you</p>

  <router-view />

</div>



</template>

<style scoped>

</style>