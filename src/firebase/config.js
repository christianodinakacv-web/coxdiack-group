// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoMrN9HpyYSuT_KofOpacF2JOPTvUeDoE",
  authDomain: "coxdiack-group.firebaseapp.com",
  projectId: "coxdiack-group",
  storageBucket: "coxdiack-group.appspot.com",
  messagingSenderId: "394097093456",
  appId: "1:394097093456:web:7a2e1b3f8fc3cac4dbda55"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;