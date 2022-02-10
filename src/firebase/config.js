import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCdVy5durOJWH8fPfk3wc8AOnd5QI7VHBM",
  authDomain: "capstone-c3953.firebaseapp.com",
  projectId: "capstone-c3953",
  storageBucket: "capstone-c3953.appspot.com",
  messagingSenderId: "954079077486",
  appId: "1:954079077486:web:6063d49a8dd608e6e2b27f"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()


// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth,projectStorage ,timestamp }