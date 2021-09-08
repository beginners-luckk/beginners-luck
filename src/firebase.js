import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

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
