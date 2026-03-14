import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDlewctbd-nOLq_cAxxaDYk89kQWBO44kA",
  authDomain: "construction-site-8bb50.firebaseapp.com",
  projectId: "construction-site-8bb50",
  storageBucket: "construction-site-8bb50.firebasestorage.app",
  messagingSenderId: "630579315954",
  appId: "1:630579315954:web:786b207f524a267d65fc6b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
