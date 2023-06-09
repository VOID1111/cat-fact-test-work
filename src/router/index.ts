import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/fact/:id',
    name: 'fact',
    component: () => import(/* webpackChunkName: "about" */ '../views/Fact.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
