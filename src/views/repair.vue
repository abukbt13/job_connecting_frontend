<div class="employees">
<div class="" v-for="employer in employers" :key="employer">
  <div class="card d-flex flex-column align-items-center" style="width: 18rem;padding-top: 0.5rem;">
    <img v-if="employer.picture" :src="storage + 'Profiles/' + employer.picture" height="200" width="200" style="border-radius: 50%;" alt="No Image">
    <img v-else src="/user.png" height="200" width="200" class="" alt="...">

    <div class="card-body">
      <h5 class="card-title">{{ employer.firstName }} {{ employer.lastName }}</h5>
      <div class="">
        <a href="#" class="btn mx-2 btn-primary">More</a>

        <a href="#" class="btn mx-2  btn-primary">connect</a>
      </div>
    </div>
  </div>
</div>
</div>

const getEmployers = async () => {
const response = await axios.get(base_url.value+'employers', authHeader);
if(response.status === 200){
employers.value=response.data.employers
}
}