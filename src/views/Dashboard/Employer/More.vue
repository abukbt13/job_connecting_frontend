<script setup>
import Header from "@/components/Header.vue";
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
      <h2>More Information</h2>
      <div class="border p-3 mt-1">
        <h2>Full Name</h2>
        <p>{{user.firstName}} {{user.lastName}}</p>
      </div>    <div class="border p-3 mt-1">
        <h2>County</h2>
        <p>{{user.county}}</p>
      </div>    <div class="border p-3 mt-1">
        <h2>Sub County</h2>
        <p>{{user.sub_county}}</p>
      </div>
      <div class="border p-3 mt-1">
        <h2>Phone Number</h2>
        <p>{{user.phone}}</p>
      </div>
      <div class="border p-3 mt-1">
        <h2>Gender</h2>
        <p>{{user.gender}}</p>
      </div>
    </div>

    <div class="col">

      <div v-if="count>0" class="">
      <ol>

        <H2 class="text-center ">Reference</H2>
          <li v-for="ref in referees" :key="ref">
            <div class=" border">
                <div class="details border p-4">
                  <div class="w-50">
                    <div class="border m-1 flex-column align-items-center">
                      <h2>Full Name</h2>
                      <p>{{ ref.firstName }} {{ ref.lastName }} </p>
                    </div>
                    <div class="border m-1">
                      <h3>Email</h3>
                      <p>{{ ref.phone }}</p>
                    </div>
                  </div>
                  <div class="w-50 m-1 ">
                    <div class="border m-1 flex-column align-items-center">
                      <h2>Full Name</h2>
                      <p>{{ ref.firstName }} {{ ref.lastName }} </p>
                    </div>
                    <div class="border m-1">
                      <h3>Email</h3>
                      <p>{{ ref.phone }}</p>
                    </div>
                  </div>
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
.details{
  display: flex;
  justify-content: space-between;
}

</style>