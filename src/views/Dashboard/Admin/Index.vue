
<script setup>

import Header from "@/components/Header.vue";
import axios from "axios";
import {onMounted, ref} from "vue";

import {auth} from "@/Composables/auth.js";
const {base_url,authHeader} =auth();
const messages = ref([])
const show_logs = ref([])
const payments = ref([])
const users = ref([])
const getMessages = async () => {
  const response = await axios.get(base_url.value+'inquire/message', authHeader);
  if(response.status === 200){
    messages.value=response.data.message
  }
}
const getLogs = async () => {
  const response = await axios.get(base_url.value+'show_logs', authHeader);
  if(response.status === 200){
    show_logs.value=response.data.logs
  }
}

const getPayments = async () => {
  const response = await axios.get(base_url.value+'payments', authHeader);
  if(response.status === 200){
    payments.value=response.data.connects
  }
}
const getUsers = async () => {
  const response = await axios.get(base_url.value+'users', authHeader);
  if(response.status === 200){
    users.value=response.data.users
  }
}

onMounted(()=>{
  getMessages()
  getUsers()
  getLogs()
  getPayments()
})
</script>

<template>
  <Header />
  <div class="d-flex">
    <div style="background-color: #ddd;height: 100vh;" class="">
      <h2>Dashboard</h2>
      <hr>

       <li  class="list-unstyled text-uppercase" data-bs-toggle="modal" data-bs-target="#users">Users</li>
       <li  data-bs-toggle="modal" data-bs-target="#Logs" class="list-unstyled text-uppercase">Logs</li>
       <li  data-bs-toggle="modal" data-bs-target="#payment" class="list-unstyled text-uppercase">Payments</li>

<!--modals-->
      <div class="modal fade" id="users" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">All users</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <div class="table-responsive">
                <table class="table table-bordered border mt-2">
                  <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">name</th>
                    <th scope="col">Email</th>
                    <th scope="col">County</th>
                    <th scope="col">Sub County</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="user in users" :key="user">
                    <td >{{ user.firstName }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.county }}</td>
                    <td>{{ user.sub_county }}</td>
                  </tr>

                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>



      <div class="modal fade" id="Logs" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">More info</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <div class="table-responsive">
                <table class="table table-bordered border mt-2">
                  <thead>
                  <tr>
                    <th scope="col" colspan="4">Messages from users </th>
                  </tr>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">title</th>
                    <th scope="col">details</th>
                    <th scope="col">Platform</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="log in show_logs" :key="log">
                    <th scope="row">{{ log.id }}</th>
                    <td>{{ log.title }}</td>
                    <td><textarea class="form-control">{{ log.details }}</textarea></td>
                    <td>{{ log.platform }}</td>
                  </tr>

                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="payment" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">More info</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <div class="table-responsive">
                <table class="table table-bordered border mt-2">
                  <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">job_seeker_id</th>
                    <th scope="col">employer_id</th>
                    <th scope="col">Receit No</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="payment in payments" :key="payment">
                    <td>{{ payment.id }}</td>
                    <td>{{ payment.job_seeker_id }}</td>
                    <td>{{ payment.employer_id }}</td>
                    <td>{{ payment.receipt_no }}</td>
                  </tr>

                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="table-responsive">
      <table class="table table-bordered border ms-4 mt-2">
        <thead>
        <tr>
          <th scope="col" class="text-center fs-2" colspan="6">Messages from users </th>
        </tr>

        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Message</th>
          <th  scope="col">Operations </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="message in messages" :key="message">
          <th scope="row">{{ message.id }}</th>
          <td>{{ message.name }}</td>
          <td>{{ message.email }}</td>
          <td><textarea name="" class="form-control">{{ message.message }}</textarea></td>
          <td><button class="btn btn-success">View</button></td>
          <td><button class="btn btn-primary">Reply</button></td>
        </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped>
li{
  padding: 1rem 1rem 1rem 1rem;
}
li:hover{
  background-color: #4287f5;
  color:white;
}
</style>