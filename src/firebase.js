// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1JMeiaQOYPuwMrfAqegp7Qsm5vl78H5M",
  authDomain: "realty-f953e.firebaseapp.com",
  projectId: "realty-f953e",
  storageBucket: "realty-f953e.appspot.com",
  messagingSenderId: "716549706988",
  appId: "1:716549706988:web:d54784cdd09bb7917fc1c9"
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({   
    prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);