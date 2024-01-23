import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import FinishReset from '../views/auth/FinishReset.vue'
import UserIndex from '../views/Dashboard/Job_Seeker/Index.vue'
import RecentlyPosted from "@/views/Dashboard/Job_Seeker/RecentlyPosted.vue";
import SavedJobs from "@/views/Dashboard/Job_Seeker/SavedJobs.vue";
import Bestmatches from "@/views/Dashboard/Job_Seeker/Bestmatches.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },

      // Authenthication
    {
      path: '/auth/login',
      component: Login
    },
    {
      path: '/auth/register',
      component: Register
    },
    {
      path: '/auth/forget_password',
      component: ForgotPassword
    },
    {
      path: '/auth/reset_password',
      component: FinishReset
    },
      //dashboard
    {
      path: '/user/dashboard',
      component: UserIndex,
      children:
        [
          {
            path: '/dashboard',
            component: RecentlyPosted
          },
          {
            path: '/dashboard/saved_jobs',
            component: SavedJobs
          },
          {
            path: '/dashboard/best_matches',
            component: Bestmatches
          },
        ]
  },

  ]
})

export default router
