
<script setup>

import Header from "@/components/Header.vue"
</script>

<template>
<Header />
  <div  class="main_contents">
       <router-view />

  </div>


<Footer />

</template>

<style scoped>
/*.main_contents{*/
/*  width: 100%;*/
/*  display:flex;*/
/*}*/
/*.connects{*/
/*  width: 25%;*/
/*  background-color: #9eeaf9;*/
/*}*/

</style>