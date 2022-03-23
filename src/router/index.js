import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PostContract from '../views/PostContract.vue'
import PostContractDetail from '../views/PostContractDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post-contract',
    name: 'PostContract',
    component: PostContract
  },
  {
    path: '/post-contract-detail',
    name: 'PostContractDetail',
    component: PostContractDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
