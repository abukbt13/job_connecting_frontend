
<script setup>
import {user} from "@/Composables/user.js";
const {base_url,authHeader,storage} =user()
import Header from "@/components/Header.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
const  email=ref('')
const  status=ref('')
const  phone=ref('')
const  password=ref('')
const  firstName=ref('')
const  lastName=ref('')
const  f_Name=ref('')
const  l_Name=ref('')
const  phonenumber=ref('')
const  error=ref('')
const  relationship=ref('')
const  county=ref('')
const  picture=ref('')
const  picture_upload=ref('')
const referees=ref(null)
const details=ref(null)
function pictureUpload(e){
  picture_upload.value=e.target.files[0];
}
const   userDetails = async () => {
  const res= await axios.get(base_url.value+'user', authHeader)
  if(res.status === 200){
          details.value =res.data
          email.value=res.data.email
          phone.value=res.data.phone
          password.value=res.data.password
          firstName.value=res.data.firstName
          lastName.value=res.data.lastName
          picture.value=res.data.picture
  }
}

const editProfile = async () => {
  try {
    const formData = new FormData();
    formData.append('firstName', firstName.value);
    formData.append('lastName', lastName.value);
    formData.append('phone', phone.value);
    formData.append('picture', picture_upload.value);

    const res = await axios.post(base_url.value + 'auth/update', formData, authHeader);

    if(res.data.status == 'success') {
          await  userDetails()
          status.value = 'Profile updated Successfully!'
    }
    else {
      status.value = 'Update failed';
    }
  } catch (error) {
    status.value = 'Can update profile at the moment try again later';
  }
};

const addReference = async () => {
    const formData = new FormData();
    formData.append('firstName', f_Name.value);
    formData.append('lastName', l_Name.value);
    formData.append('phone', phonenumber.value);
    formData.append('relationship', relationship.value);
    formData.append('county', county.value);

    const res = await axios.post(base_url.value + 'referee/add', formData, authHeader);

    if (res.status === 200) {
     if(res.data.status == 'success') {
       await useReference()
       status.value = 'Reference added Successfully!'
     }
     else {
       status.value= res.data;
     }
    } else {
      status.value = 'Error in network try again later!'
    }
  }


const   useReference = async () => {
  const res = await axios.get(base_url.value + 'referee/view', authHeader)
  referees.value=res.data.referees
}

onMounted( ()=>{

  userDetails()
  useReference()

})
</script>
<template>
  <Header />
  <div v-if="status" class="bg-info">
    <p style="font-size: 24px;" class="p-3 text-uppercase">{{status}}</p>
  </div>
  <div v-if="details" class="container">
    <div class="row mt-1">
      <div class="col col-sm-12 col-md-5 col-lg-5">
        <div class="border">
          <h2>Personal Details</h2>
          <div class="card" style="width: 100%;">

            <div class="card-body">
              <div class="d-flex">
                <div class="">

                  <img  :src="'http://127.0.0.1:8000/storage/Profiles/'+picture"    height="200" width="200" class="" alt="...">
                </div>
                <div class="ms-2">

                  <h2>First Name </h2>
                  <p>{{firstName}}</p>
                  <h2>First Name </h2>
                  <p>{{lastName}}</p>
                </div>
              </div>
              <div class="d-flex">
                <div class="">
                  <h2>Email </h2>
                  <p>{{email}}</p>
                  <h2>Phone</h2>
                  <p>{{phone}}</p>
                </div>

              </div>


              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Profile</button>
            </div>
          </div>
          <!-- Button trigger modal -->

          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="editProfile">
                <div class="modal-body">

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
                      <label for="exampleFormControlTextarea1" class="form-label">Upload Profile</label>
                      <input type="file" class="form-control" @change="pictureUpload">
                    </div>



                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button  style="background-color: greenyellow;" type="submit" data-bs-dismiss="modal"  class="btn  btn-block text-uppercase">Update Account<i style="font-size" class="bi bi-telegram float-end"></i>
                  </button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>


        <!--end Modal -->

      </div>




      <div class="col border col-sm-12 col-md-6 col-lg-6">

        <div style="width: 100%;">
          <div>

            <table class="table table-bordered">
              <thead>
              <tr>
                <td colspan="7">
                  <h2>Reference details                   <button class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#addRef">Add Reference</button>
                </h2>
                </td>
              </tr>
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
              <tr v-for="referee in referees" :key="referee">
                <th scope="row">1</th>
                <td>{{referee.firstName}}</td>
                <td>{{referee.lastName}}</td>
                <td>{{referee.phone}}</td>
                <td>{{referee.relationship}}</td>
                <td>{{referee.county}}</td>
                <td>
                  <button class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#editRef">Edit</button>
                </td>
              </tr>

              </tbody>
            </table>
            <div class="modal fade" id="addRef" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Referee Details</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form @submit.prevent="addReference">
                    <div class="modal-body">

                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">First Name</label>
                        <input type="text" class="form-control" v-model="f_Name">
                      </div>
                      <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Last Name</label>
                        <input type="text" class="form-control" v-model="l_Name">
                      </div>
                      <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Phone</label>
                        <input type="number" class="form-control" v-model="phonenumber">
                      </div>
                      <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Relationship</label>
                        <input type="text" class="form-control" v-model="relationship">
                      </div>
                      <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">County</label>
                        <input type="text" class="form-control" v-model="county">
                      </div>



                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button  style="background-color: greenyellow;" type="submit"  data-bs-dismiss="modal" class="btn   btn-block text-uppercase">Add Referee<i style="font-size" class="bi bi-plus float-end"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>

</style>