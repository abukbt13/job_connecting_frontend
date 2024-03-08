import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Validate from '../views/auth/Validate.vue'
import Register from '../views/auth/Register.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import FinishReset from '../views/auth/FinishReset.vue'
import Job_seeker from '../views/Dashboard/Job_Seeker/Index.vue'
import employer_Dashboard from '../views/Dashboard/Employer/Index.vue'
import RecentlyPosted from "@/views/Dashboard/Job_Seeker/RecentlyPosted.vue";
import Bestmatches from "@/views/Dashboard/Job_Seeker/Bestmatches.vue";
import Profiles from "@/views/Dashboard/User/Profiles.vue"
import SavedConnects from "@/views/Dashboard/Job_Seeker/SavedConnects.vue";
const router = createRouter({  history: createWebHistory(import.meta.env.BASE_URL),
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
    {
      path: '/user/profile',
      component: Profiles
    },
    {
      path: '/validate/:id',
      component : Validate
    },
    {
      path: '/e/dashboard',
      component: employer_Dashboard
    },

    {
      path: '/J/dashboard',
      component: Job_seeker,
      children: [
        {
          path: '/J/dashboard',
          component: RecentlyPosted,
        },
        {
          path: 'best_match',
          component: Bestmatches,
        },
        {
          path: 'saved_connect',
          component: SavedConnects,
        }
      ]
    },
]
})

export default router
