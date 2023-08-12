import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBVOs-FVP6_qEM88Umc41kU4kL2gs3A_E0",
    authDomain: "school-devs.firebaseapp.com",
    projectId: "school-devs",
    storageBucket: "school-devs.appspot.com",
    messagingSenderId: "755771533601",
    appId: "1:755771533601:web:a61c8aa25198ed9768f660"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export { auth, db }