import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_API_AUTH,
  projectId: import.meta.env.VITE_API_PROJECT,
  storageBucket: import.meta.env.VITE_API_STORAGE,
  messagingSenderId: import.meta.env.VITE_API_MESSAGING,
  appId: import.meta.env.VITE_API_APP
};

// Initialize Firebase
const miAppBackend = initializeApp(firebaseConfig);

// ACÁ QUEDA REFERENCIADO EL BACKEND MÍO
export const db = getFirestore(miAppBackend);