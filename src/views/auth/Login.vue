<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const router = useRouter()
const email = ref('')
const password = ref('')
const regerror = ref('')

import {auth} from "@/Composables/auth";

const {base_url, authHeader} = auth()


const login = async () => {
  if (email.value == '' && password.value == '') {
    regerror.value = 'Please fill all fields'
  }
  const formData = new FormData();
  formData.append('email', email.value)
  formData.append('password', password.value)
  const res = await axios.post(base_url.value + 'auth/login', formData)
  if (res.status === 200) {
    if (res.data.status === 'success') {
      localStorage.setItem('token', res.data.token);
      if (res.data.user.role === 'job_seeker') {
        location.href = '/j/dashboard/'
      }
      else if (res.data.user.role === 'employer'){
        location.href = '/e/dashboard/'
      }
      else {
        location.href = '/admin/dashboard'
      }

      // await router.push('/');
    } else if (res.data.status === 'failed') {
      regerror.value = res.data.message;
    }

  } else {
    regerror.value = "Error in network"
  }


}


</script>

<template>
  <Header/>
  <section className="vh-100">
    <div className="row px-3 d-flex justify-content-center align-items-center h-100">

      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="error text-center bg-danger text-white text-uppercase">{{ reggerror }}</div>
        <h2 className="text-center text-uppercase">Login here</h2>
        <p>Dont have an account?<router-link to="/auth/register">Create Account</router-link></p>
        <form @submit.prevent="login">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
            <input type="email" className="form-control" v-model="email" placeholder="Enter your email here">
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Password</label>
            <input type="password" className="form-control" v-model="password" placeholder="password">
          </div>

          <div className="">
            <button type="submit" className="w-100 btn btn-primary btn-block">Login</button>
          </div>
          <br>
        </form>
        <p>Forget Password dont worry <router-link to="/auth/forget_password" class=" text-dark">Click here?</router-link>
        </p>
      </div>

    </div>

  </section>
</template>

<style scoped>

</style>

