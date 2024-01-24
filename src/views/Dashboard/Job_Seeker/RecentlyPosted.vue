
<script setup>

import {auth} from "@/Composables/auth.js";
import {onMounted, ref} from "vue";
import axios from "axios";
const {authHeader,authUser,base_url,storage} =auth();
const posts = ref([])
const getPosts = async () => {
  const response = await axios.get(base_url.value+'show_posts', authHeader);
  if(response.status === 200){
    posts.value=response.data.posts
  }
}
onMounted(()=>{
  getPosts()
})
</script>

<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link to="/dashboard" class="nav-link active" aria-current="page">Recently Posted</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/dashboard/best_matches" class="nav-link" aria-current="page">Best Matches</router-link>
    </li>

    <li class="nav-item">
      <router-link to="/dashboard/saved_jobs" class="nav-link" aria-current="page">Saved Jobs</router-link>
    </li>
  </ul>

  <div class="">
  <div v-for="post in posts" :key="post" class="posts my-1">
    <h2>House Help</h2>
    <p>{{post.description}}</p>
    <button class="btn btn-success float-end">Connect</button>
  </div>
  </div>
</template>

<style scoped>
.posts{
  border-bottom: 1px solid;
  height:10rem
}
.posts:hover{
  background-color:rgba(12,2,250,.3);
}

</style>