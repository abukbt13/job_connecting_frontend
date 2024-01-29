
<script setup>
import {user} from "@/Composables/user.js";
const {base_url,storage} =user()
import Header from "@/components/Header.vue";
import {onMounted, ref} from "vue";
import axios from "axios";

const details=ref(null)
const   userDetails = async () => {
  const res= await axios.get(base_url.value+'user', authHeader)
  if(res.status === 200){
    details.value=res.data
  }
}


const phone = ref('')
const error = ref('')
const firstName = ref('')
const lastName = ref('')
// const editProfile =async () => {
//
//     const formData = new FormData();
//     formData.append('firstName', firstName.value)
//     formData.append('lastName', lastName.value)
//     formData.append('phone', phone.value)
//     const res = await axios.post('http://127.0.0.1:8000/api/auth/update',formData)
//     if(res.status === 200){
//       if(res.data.status === 'success'){
//         localStorage.setItem('token', res.data.token)
//
//         localStorage.setItem('progress', 0)
//         localStorage.setItem('progress', 0)
//         await router.push('/dashboard')
//       }
//       else{
//         error.value = res.data.message
//       }
//     }
//     else{
//       error.value = 'url not found'
//     }
//
//
// }

onMounted( ()=>{

  userDetails()

})
</script>
<template>
  <Header />
  <div v-if="details" class="container">
    <div class="row mt-1">
      <div class="col col-sm-12 col-md-5 col-lg-5">
        <div class="border">
          <h2>Personal Details</h2>
          <div class="card" style="width: 100%;">

            <div class="card-body">
              <div class="d-flex">
                <div class="">
                  <img src="/public/abu.jpg"   height="200" width="200" class="" alt="...">
                </div>
                <div class="ms-2">

                  <h2>First Name </h2>
                  <p>{{details.firstName}}</p>
                  <h2>First Name </h2>
                  <p>{{details.lastName}}</p>
                </div>
              </div>
              <div class="d-flex">
                <div class="">
                  <h2>Email </h2>
                  <p>{{details.email}}</p>
                  <h2>Phone</h2>
                  <p>{{details.phone}}</p>
                </div>
                <div class="ms-2">

                  <h2>Gender </h2>
                  <p>{{details.gender}}Male</p>
                  <h2>Phone</h2>
                  <p>{{details.phone}}</p>
                </div>
              </div>


              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Profile</button>
            </div>
          </div>
        </div>


        <!-- Modal -->
        <!--        <div v-if="details" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">-->
        <!--          <div class="modal-dialog">-->
        <!--            <div class="modal-content">-->
        <!--              <div class="modal-header">-->
        <!--                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Profile</h1>-->
        <!--                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
        <!--              </div>-->
        <!--              <form @submit.prevent="editProfile">-->
        <!--              <div class="modal-body">-->

        <!--                  <div class="mb-3">-->
        <!--                    <label for="exampleFormControlInput1" class="form-label">First Name</label>-->
        <!--                    <input type="text" class="form-control" v-model="firstName" value="details.firstName">-->
        <!--                  </div>-->
        <!--                  <div class="mb-3">-->
        <!--                    <label for="exampleFormControlTextarea1" class="form-label">Last Name</label>-->
        <!--                    <input type="text" class="form-control" v-model="details.lastName">-->
        <!--                  </div>-->
        <!--                  <div class="mb-3">-->
        <!--                    <label for="exampleFormControlTextarea1" class="form-label">Phone</label>-->
        <!--                    <input type="number" class="form-control" v-model="details.phone">-->
        <!--                  </div>-->


        <!--              </div>-->
        <!--              <div class="modal-footer">-->
        <!--                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>-->
        <!--                <button  style="background-color: greenyellow;" type="submit" class="btn  btn-block text-uppercase">Update Account<i style="font-size" class="bi bi-telegram float-end"></i>-->
        <!--                </button>-->
        <!--              </div>-->
        <!--              </form>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>

            <div class="col border col-sm-12 col-md-6 col-lg-6">

                <div style="width: 100%;">
                  <div>
                    <h2>Reference details</h2>
                    <table class="table table-bordered">
                      <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Phone number</th>
                        <th scope="col">Relationship</th>
                        <th scope="col">County</th>
                        <th scope="col">Operation</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td><button class="btn btn-primary">Edit</button></td>
                      </tr>


                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

    </div>
  </div>

</template>



<style scoped>

</style>