// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAup1xGuMKtn4b4aWFd9KJX7AnodIcyaog",
  authDomain: "journalify-web-app.firebaseapp.com",
  projectId: "journalify-web-app",
  storageBucket: "journalify-web-app.appspot.com",
  messagingSenderId: "624038074728",
  appId: "1:624038074728:web:fd822b3b28b2f6152a9edd",
  measurementId: "G-SSYCR842VS",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage, app };

export default db;
