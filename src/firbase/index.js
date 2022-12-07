// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app"
import {getStorage} from "firebase/storage"
import "firebase/compat/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABoR5vuuKLzxOPF7D8qTxFqbaPOq7lHtI",
  authDomain: "esdproject-48d94.firebaseapp.com",
  projectId: "esdproject-48d94",
  storageBucket: "esdproject-48d94.appspot.com",
  messagingSenderId: "816323121299",
  appId: "1:816323121299:web:7fdb6f801bc8984211bd66"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default firebase; 
export const storage = getStorage(app);




