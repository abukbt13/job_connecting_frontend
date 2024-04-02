<script setup>
import Header from "@/views/Header.vue";
import {useRoute} from "vue-router";
import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/Composables/auth.js";
const {base_url,authHeader,storage} =auth()
const route = useRoute()
const user = ref([])
const count = ref('')
const referees = ref([])
const user_id = route.params.user_id
const   userDetails = async () => {
  const res= await axios.get(base_url.value+'more/user/'+user_id, authHeader)
  if(res.status === 200){
    user.value = res.data.user
  }
}
const   showReferees = async () => {
  const res= await axios.get(base_url.value+'user/ref/'+user_id, authHeader)
  if(res.status === 200){
    referees.value = res.data.refs
    count.value = res.data.count
  }
}

onMounted( ()=> {
  userDetails()
  showReferees()
})
</script>

<template>
  <Header />
<div class="container">
  <div class="row">
    <div class="col">
      <h2>More About ABraham Kibet</h2>
      <h5>First Name</h5>
      <p>{{user.firstName}}</p>
      <h5>Last Name</h5>
      <p>{{user.lastName}}</p>
      <h5>County</h5>
      <p>{{user.county}}</p>
      <h5>Sub county</h5>
      <p>{{user.sub_county}}</p>
      <h5>Phone Number</h5>
      <p>{{user.phone}}</p>
      <h5>Gender</h5>
      <p>{{user.gender}}</p>
    </div>

    <div class="col">
      <H2>Reference</H2>
      <div v-if="count>0" class="">

      <ol>
          <li v-for="ref in referees" :key="ref">
            <div class="d-flex">
              <div class="">
                <h2>First Name</h2>
                <p>{{ ref.firstName }}</p>
                <h2>County</h2>
                <p>{{ ref.county }}</p>
                <h2>Email</h2>
                <p>{{ ref.email }}</p>

              </div>
              <div class="">
                <h2>Last Name</h2>
                <p>{{ ref.lastName }}</p>
                <h2>Sub County</h2>
                <p>{{ ref.sub_county }}</p>
                <h2>Phone</h2>
                <p>{{ ref.phone }}</p>
              </div>
            </div>
          </li>
        </ol>
      </div>
      <div v-else class="">
        <h1 class="text-danger">No reference provided</h1>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>