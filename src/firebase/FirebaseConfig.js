// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwNwrEU0jB6cvp07VCzWBBHuCPuCUOVZg",
  authDomain: "fir-6cc44.firebaseapp.com",
  projectId: "fir-6cc44",
  storageBucket: "fir-6cc44.appspot.com",
  messagingSenderId: "775690383406",
  appId: "1:775690383406:web:ebef55e795b3341097afbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);