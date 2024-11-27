// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection, addDoc ,getDocs,doc, updateDoc, deleteDoc} from "firebase/firestore";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNM4E1yqgKruLoQKfvGvPckO7Urd-UI3A",
  authDomain: "fir-crud-9f598.firebaseapp.com",
  projectId: "fir-crud-9f598",
  storageBucket: "fir-crud-9f598.firebasestorage.app",
  messagingSenderId: "131106558167",
  appId: "1:131106558167:web:49d063921d8f6db7412092"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 

export {
  app,
  db,
  auth,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};
