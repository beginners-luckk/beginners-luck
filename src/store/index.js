import Vue from "vue"
import Vuex from "vuex"
import firebase from "firebase"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      uid: "",
      displayName: "",
      photoURL: "",
    },
  },
  mutations: {
    setUser(state, user) {
      const { uid, displayName, photoURL } = user
      state.user.uid = uid
      state.user.displayName = displayName
      state.user.photoURL = photoURL
    },
  },
  actions: {
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    signOut(context) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          context.commit("setUser", { uid: "", displayName: "", photoURL: "" })
        })
    },
  },
  getters: {
    user(state) {
      return state.user
    },
    isSignedIn(state, getters) {
      return getters.user.uid
    },
  },
})

export default store

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        let userProfile = {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }
        // doc.exists がない === 初回ログイン
        // はじめてのログインなので、 userProfile を firestore に保存
        if (!doc.exists) {
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .set(userProfile)
        }
        store.commit("setUser", userProfile)
      })
  } else {
    store.commit("setUser", { uid: "", displayName: "", photoURL: "" })
  }
})
