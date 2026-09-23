import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAO92zTPH_-Y5-J003hGbpRL_zvUe8-PHE",
    authDomain: "mathlab-59d01.firebaseapp.com",
    projectId: "mathlab-59d01",
    storageBucket: "mathlab-59d01.firebasestorage.app",
    messagingSenderId: "708111061239",
    appId: "1:708111061239:web:3c7763bdcc18d65ed803f2",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
