import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from '@firebase/storage';
import { getFunctions } from '@firebase/functions';


const firebaseConfig = {
  apiKey: "AIzaSyAMMYcJj_kHqB__U6hYl2K5sr9r4g2FtX8",
  authDomain: "wyenfos-b7b96.firebaseapp.com",
  projectId: "wyenfos-b7b96",
  storageBucket: "wyenfos-b7b96.firebasestorage.app",
  messagingSenderId: "241757488708",
  appId: "1:241757488708:web:da46d691b15d4516a1de11",
  measurementId: "G-4556L9PEHV"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

