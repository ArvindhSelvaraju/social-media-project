// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2FbhoHE0pWRvC63VvEFZZjPWniRrt170",
  authDomain: "social-media-app-9b7a0.firebaseapp.com",
  projectId: "social-media-app-9b7a0",
  storageBucket: "social-media-app-9b7a0.appspot.com",
  messagingSenderId: "155711841274",
  appId: "1:155711841274:web:c1e6530a268320d0f93a43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);