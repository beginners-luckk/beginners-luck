import Vue from "vue"
import VueRouter from "vue-router"
import BeforeSignIn from "@/views/BeforeSignIn.vue"
import AfterSignIn from "@/views/AfterSignIn.vue"
import firebase from "firebase"
import Home from "../views/Home.vue"
import Easyinterview from "../views/Easyinterview.vue"
import Mediuminterview from "../views/Mediuminterview.vue"
import Hardinterview from "../views/Hardinterview.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/BeforeSignIn",
  },
  {
    path: "/BeforeSignIn",
    name: "BeforeSignIn",
    component: BeforeSignIn,
  },
  {
    path: "/AfterSignIn",
    name: "AfterSignIn",
    component: AfterSignIn,
  },
  {
    path: "/Home",
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

const isSignedIn = async () => {
  // Promise を使って、onAuthStateChanged が完了するまで待つ
  return await new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          unsubscribe()
          resolve(true)
        } else {
          unsubscribe()
          resolve(false)
        }
      },
      (error) => {
        unsubscribe()
        reject(error)
      }
    )
  })
}

// Vue Router のグローバルガードで、ログインしてない場合は、BeforeSignInにしか行けなくする。

router.beforeEach(async (to, from, next) => {
  const auth = await isSignedIn()
  if (to.name !== "BeforeSignIn" && !auth) {
    next("/BeforeSignIn")
  } else {
    next()
  }
})

export default router
