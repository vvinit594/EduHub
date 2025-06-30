import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAek7zf8Rmxf3djwV0v5N2P3PNiKZBklis",
  authDomain: "login-74dfb.firebaseapp.com",
  projectId: "login-74dfb",
  storageBucket: "login-74dfb.firebasestorage.app",
  messagingSenderId: "318708252259",
  appId: "1:318708252259:web:85e493439be786f373c256"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);