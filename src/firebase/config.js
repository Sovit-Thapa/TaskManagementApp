import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmakl81t8weukyzD2Iqi6o4s2zEkPv8Hs",
  authDomain: "taskmanagement-fccce.firebaseapp.com",
  projectId: "taskmanagement-fccce",
  storageBucket: "taskmanagement-fccce.firebasestorage.app",
  messagingSenderId: "168930203934",
  appId: "1:168930203934:web:7b8673acc6d3c1ac39510f",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db};
