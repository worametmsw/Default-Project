import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDQ7_d9MsZUs4gwgU249VEuYvstx9az2r0",
  authDomain: "logintest-3cfd0.firebaseapp.com",
  databaseURL: "https://logintest-3cfd0-default-rtdb.firebaseio.com",
  projectId: "logintest-3cfd0",
  storageBucket: "logintest-3cfd0.appspot.com",
  messagingSenderId: "639585990585",
  appId: "1:639585990585:web:77ca8f61b9aa6f08f56868",
  measurementId: "G-J5M2P7HX0M"
};
let app = null
// prevent initializing firebase more than once
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}
// inject it so it can be accessed as this.$firebase inside the project
export default (ctx, inject) => {
  inject('firebase', firebase)
}

const fireDb = firebase.firestore()
export const auth = firebase.auth()
export const DB = firebase.database()
export { fireDb }
