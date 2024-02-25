<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link to="/jobs/dashboard/" class="nav-link" aria-current="page">Recently Posted</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/jobs/dashboard/best_match" class="nav-link" aria-current="page">Best Matches</router-link>
    </li>

    <li class="nav-item">
      <router-link to="/jobs/dashboard/saved_connect" class="nav-link active" aria-current="page">Saved Jobs</router-link>
    </li>
  </ul>
<p>Saved Jobs</p>
</template>

<script>
export default {
  name: "SavedJobs"
}
</script>

<style scoped>

</style>