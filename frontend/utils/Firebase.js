import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";
 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginonecart-45181.firebaseapp.com",
  projectId: "loginonecart-45181",
  storageBucket: "loginonecart-45181.firebasestorage.app",
  messagingSenderId: "738342354605",
  appId: "1:738342354605:web:463c7bfa53eaaaff4ed024",
  measurementId: "G-EP692B6HJD"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}