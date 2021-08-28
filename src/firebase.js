import Vue from "vue"
import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCj7hkQokrcAHzbHRXgd77xv5OY4WSm4ZY",
  authDomain: "beginners-luck-e62f1.firebaseapp.com",
  projectId: "beginners-luck-e62f1",
  storageBucket: "beginners-luck-e62f1.appspot.com",
  messagingSenderId: "5219931822",
  appId: "1:5219931822:web:f32e891811e6c116c87f3f",
  measurementId: "G-EPPVNGCM0S",
}

firebase.initializeApp(firebaseConfig)
const initialUserState = {
  uid: "",
  displayName: "",
  photoURL: "",
}
const $auth = Vue.observable({
  currentUser: { ...initialUserState },
})
firebase.auth().onAuthStateChanged((user) => {
  let state
  if (user) {
    const { uid, displayName, photoURL } = user
    state = {
      uid,
      displayName,
      photoURL,
    }
  } else {
    state = initialUserState
  }
  Object.assign($auth.currentUser, state)
})
Vue.prototype.$auth = $auth
