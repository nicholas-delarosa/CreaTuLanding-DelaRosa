// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ7EKY5ArsslHyM_z4YwOmefBsJoBvPx8",
  authDomain: "tiendaonline-delarosa.firebaseapp.com",
  projectId: "tiendaonline-delarosa",
  storageBucket: "tiendaonline-delarosa.firebasestorage.app",
  messagingSenderId: "718456913752",
  appId: "1:718456913752:web:9a52fd239c3282544d2f2d"
};

// Initialize Firebase
const miAppBackend = initializeApp(firebaseConfig);

// ACÁ QUEDA REFERENCIADO EL BACKEND MÍO
export const db = getFirestore(miAppBackend);