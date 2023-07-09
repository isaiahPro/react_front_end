
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const Fire_Api = process.env.REACT_APP_FIREBASE_API;
const SenderId = process.env.REACT_APP_Sender_ID;
const firebaseConfig = {
  apiKey: `${Fire_Api}`,
  authDomain: "shopadminproject.firebaseapp.com",
  projectId: "shopadminproject",
  storageBucket: "shopadminproject.appspot.com",
  messagingSenderId: `${SenderId}`,
  appId: "1:743449581330:web:1851a8f5c74716363545cb",
  measurementId: "G-5YFFZ8608W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Firebase = getAuth(app);
export default Firebase;



