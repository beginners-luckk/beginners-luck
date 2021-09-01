import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Easyinterview from "../views/Easyinterview.vue"
import Mediuminterview from "../views/Mediuminterview.vue"
import Hardinterview from "../views/Hardinterview.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/History",
    name: "History",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/History.vue"),
  },
  {
    path: "/",
    name: "Easyinterview",
    component: Easyinterview,
  },
  {
    path: "/",
    name: "Medium",
    component: Mediuminterview,
  },
  {
    path: "/",
    name: "Hard",
    component: Hardinterview,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
