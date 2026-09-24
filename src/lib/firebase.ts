import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtazqet61s0hSSsQCY4ITVlCwlTdnt7ag",
  authDomain: "stratix-solutions.firebaseapp.com",
  projectId: "stratix-solutions",
  storageBucket: "stratix-solutions.firebasestorage.app",
  messagingSenderId: "768411703913",
  appId: "1:768411703913:web:ee12bbb4e4bc8e7594a0f8"
};

// Initialize Firebase only if it hasn't been initialized already (useful for Next.js SSR)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
