import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/firebase-storage'

let config = {
    apiKey: "AIzaSyCEojoTMKO3kO86-5rOIurcNiOKMYdA_6A",
    authDomain: "mymeetups-40d97.firebaseapp.com",
    databaseURL: "https://mymeetups-40d97.firebaseio.com",
    projectId: "mymeetups-40d97",
    storageBucket: "mymeetups-40d97.appspot.com",
    messagingSenderId: "825439717451",
    appId: "1:825439717451:web:e9b45b9ce7613b8c"
  };

firebase.initializeApp(config)

export default firebase