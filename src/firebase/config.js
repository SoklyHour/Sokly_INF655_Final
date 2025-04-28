import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBejgN1WmuyXA8CrbQdAd73aibE0f7_y7Q",
  authDomain: "appmanager-01.firebaseapp.com",
  projectId: "appmanager-01",
  storageBucket: "appmanager-01.firebasestorage.app",
  messagingSenderId: "670136203838",
  appId: "1:670136203838:web:9e4acfacc4440a78622f6f",
  measurementId: "G-SNRTF2ZG5F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;