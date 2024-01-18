
<script setup>
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
const router = useRouter()
const email = ref('')
const password = ref('')
const c_password = ref('')
const regerror = ref('')
 const createAccount =async () => {
  if(email.value=='' && password.value==''){
    regerror.value = 'Please fill all fields'
  }
   else if (password.value === c_password.value) {
     const formData = new FormData();
     formData.append('email', email.value)
     formData.append('password', password.value)
     formData.append('c_password', c_password.value)
    const res = await axios.post('http://127.0.0.1:8000/api/registerUser',formData)
       if(res.status === 200){
            if(res.data.status === 'success'){
              localStorage.setItem('token', res.data.token)

              localStorage.setItem('progress', 0)
              localStorage.setItem('progress', 0)
             await router.push('applicant')
            }
            else{
              regerror.value = res.data.message
            }
       }
       else{
        regerror.value = 'url not found'
       } 
        
   }
   else {
     regerror.value = 'Passwords do not match'
   }
 }
</script>

<template>
  <section class="vh-100">
    <div class="row d-flex justify-content-center align-items-center h-100">

        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="error text-center bg-danger text-white text-uppercase">{{regerror}}</div>
          <p>Aready hav an account?<router-link to="login">Login here</router-link></p>
          <h2 className="text-center text-uppercase text-primary">create account</h2>
          <form @submit.prevent="createAccount">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">First Name</label>
                <input type="text" class="form-control" v-model="f_name">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Last Name</label>
                <input type="text" class="form-control" v-model="l_name">
              </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Phone</label>
                <input type="number" class="form-control" v-model="phone">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Email</label>
                <input type="text" class="form-control" v-model="l_name">
              </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Current Location</label>
                <input type="text" class="form-control" v-model="location">
              </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Register as?</label>
                <select v-model="user">
                  <option value="employer">Employer</option>
                  <option value="job_seeker">Job Seeker</option>
                </select>
              </div>
            <div class="">
              <button type="submit" class="w-100 btn btn-primary btn-block text-uppercase">Continue<i style="font-size" class="bi bi-telegram float-end"></i>
              </button>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Password</label>
              <input type="password" class="form-control" v-model="password">
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Current Location</label>
              <input type="c_password" class="form-control" v-model="c_password">
            </div>


            <div class="">
                <button style="background-color: greenyellow;" type="submit" class="w-100 btn  btn-block text-uppercase">Finish<i style="font-size" class="bi bi-telegram float-end"></i>
                </button>
              </div>
          </form>
        </div>

      </div>

</section>
</template>

<style scoped>

</style>

