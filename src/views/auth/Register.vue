
<script setup>
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
const router = useRouter()
const email = ref('')
const phone = ref('')
const password = ref('')
const c_password = ref('')
const error = ref('')
const firstName = ref('')
const lastName = ref('')
 const createAccount =async () => {
  if(email.value=='' && password.value==''  && password.value =='' && firstName.value=='' && lastName.value=='' ){
    error.value = 'All field are required !'
  }
   else if (password.value === c_password.value) {
     const formData = new FormData();
     formData.append('email', email.value)
     formData.append('firstName', firstName.value)
     formData.append('lastName', lastName.value)
     formData.append('phone', phone.value)
     formData.append('password', password.value)
    const res = await axios.post('http://127.0.0.1:8000/api/auth/register',formData)
       if(res.status === 200){
            if(res.data.status === 'success'){
              localStorage.setItem('token', res.data.token)

              localStorage.setItem('progress', 0)
              localStorage.setItem('progress', 0)
             await router.push('/dashboard')
            }
            else{
              error.value = res.data.message
            }
       }
       else{
        error.value = 'url not found'
       } 
        
   }
   else {
     error.value = 'Passwords do not match'
   }
 }
</script>

<template>
  <section class="vh-100">
    <div class="row d-flex justify-content-center align-items-center h-100">

        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <h2 className="text-center text-uppercase text-primary">create account</h2>

          <p>Already have an account?<router-link to="login">Login here</router-link></p>
          <h3 style="background-color: rgb(123,100,200);" class="text-center  text-white text-uppercase">{{error}}</h3>
          <form @submit.prevent="createAccount">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">First Name</label>
                <input type="text" class="form-control" v-model="firstName">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Last Name</label>
                <input type="text" class="form-control" v-model="lastName">
              </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Phone</label>
                <input type="number" class="form-control" v-model="phone">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Email</label>
                <input type="email" class="form-control" v-model="email">
              </div>
<!--            <div class="mb-3">-->
<!--                <label for="exampleFormControlTextarea1" class="form-label">Current Location</label>-->
<!--                <input type="text" class="form-control" v-model="location">-->
<!--              </div>-->
<!--            <div class="mb-3">-->
<!--                <label for="exampleFormControlTextarea1" class="form-label">Register as?</label>-->
<!--                <select v-model="user">-->
<!--                  <option value="employer">Employer</option>-->
<!--                  <option value="job_seeker">Job Seeker</option>-->
<!--                </select>-->
<!--              </div>-->
<!--            <div class="">-->
<!--              <button type="submit" class="w-100 btn btn-primary btn-block text-uppercase">Continue<i style="font-size" class="bi bi-telegram float-end"></i>-->
<!--              </button>-->
<!--            </div>-->
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Password</label>
              <input type="password" class="form-control" v-model="password">
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Confirm Password</label>
              <input type="password" class="form-control" v-model="c_password">
            </div>


            <div class="">
                <button  style="background-color: greenyellow;" type="submit" class="w-100 btn  btn-block text-uppercase">Create Account<i style="font-size" class="bi bi-telegram float-end"></i>
                </button>
              </div>
          </form>
        </div>

      </div>

</section>
</template>

<style scoped>

</style>

