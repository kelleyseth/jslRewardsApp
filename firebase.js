// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "jersey-shine-rewards.firebaseapp.com",
    projectId: "jersey-shine-rewards",
    storageBucket: "jersey-shine-rewards.appspot.com",
    messagingSenderId: "329329340338",
    appId: "1:329329340338:web:a25f1ae7757e2a778bbeab",
    measurementId: "G-T6REBG9DE1",
  }

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
// const analytics = getAnalytics(app);
export { db }
