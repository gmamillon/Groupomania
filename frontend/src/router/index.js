import { createRouter, createWebHistory } from 'vue-router'
import Feed from '../views/Feed.vue'
import Profile from '../views/Profile.vue'
import Signup from '../components/Signup.vue'
import Logger from '../components/Logger.vue'
import Modify from '../components/Modify.vue'

const routes = [
  {
    path: '/',
    name: 'Logger',
    component: Logger
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/modify',
    name: 'Modify',
    component: Modify
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
