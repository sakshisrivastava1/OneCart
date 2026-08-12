import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "onecart-15d93.firebaseapp.com",
  projectId: "onecart-15d93",
  storageBucket: "onecart-15d93.firebasestorage.app",
  messagingSenderId: "1019759511350",
  appId: "1:1019759511350:web:2c86e630cc66ef5a641597",
  measurementId: "G-XW4VD848E4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth , provider}