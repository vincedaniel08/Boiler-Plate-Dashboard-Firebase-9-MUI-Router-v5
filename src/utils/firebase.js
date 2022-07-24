import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "@firebase/storage";
//import { getStorage } from "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {

  apiKey: "AIzaSyBpqzjn6AkzVOnkqfoO5Z3i4PWOXoLKoDI",
  authDomain: "san-pedro-health-center.firebaseapp.com",
  projectId: "san-pedro-health-center",
  storageBucket: "san-pedro-health-center.appspot.com",
  messagingSenderId: "131710662488",
  appId: "1:131710662488:web:b5e6b9085f928d7d2e972d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
