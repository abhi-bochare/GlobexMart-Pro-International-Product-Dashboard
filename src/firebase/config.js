import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBzwS2k96dX-HCvi18UnRGUOpRdcOxTRtE",
  authDomain: "globexmart-pro.firebaseapp.com",
  databaseURL:
    "https://globexmart-pro-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "globexmart-pro",
  storageBucket: "globexmart-pro.firebasestorage.app",
  messagingSenderId: "169398620781",
  appId: "1:169398620781:web:50537e8d71c28bdb15a564",
  measurementId: "G-05SV86G1QE",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export { ref, set, get };
