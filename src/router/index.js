import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Easyinterview from "../views/Easyinterview.vue"
import Mediuminterview from "../views/Mediuminterview.vue"
import Hardinterview from "../views/Hardinterview.vue"
import History from "../views/History.vue"

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
    component: History,
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
