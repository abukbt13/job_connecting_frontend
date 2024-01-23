<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link to="/dashboard" class="nav-link " aria-current="page">Recently Posted</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/dashboard/best_matches" class="nav-link" aria-current="page">Best Matches</router-link>
    </li>

    <li class="nav-item">
      <router-link to="/dashboard/saved_jobs" class="nav-link active" aria-current="page">Saved Jobs</router-link>
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