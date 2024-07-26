// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBqgvv4A-Yu1Y1VjV2mvvRUwQnUJHHPhO8",
//   authDomain: "realty-80c5e.firebaseapp.com",
//   projectId: "realty-80c5e",
//   storageBucket: "realty-80c5e.appspot.com",
//   messagingSenderId: "533488625667",
//   appId: "1:533488625667:web:019bcffa373aa7615e4636"
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const provider = new GoogleAuthProvider();

// provider.setCustomParameters({   
//     prompt : "select_account "
// });
// export const auth = getAuth();
// // export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// // Function to sign in with Google and get the ID token
// export const signInWithGooglePopup = async () => {
//   try {
//     const result = await signInWithPopup(auth, provider);
//     // Get the ID token
//     const idToken = await result.user.getIdToken();
//     return idToken;
//   } catch (error) {
//     console.error("Error during Google sign-in:", error);
//     throw error;
//   }
// };

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqgvv4A-Yu1Y1VjV2mvvRUwQnUJHHPhO8",
  authDomain: "realty-80c5e.firebaseapp.com",
  projectId: "realty-80c5e",
  storageBucket: "realty-80c5e.appspot.com",
  messagingSenderId: "533488625667",
  appId: "1:533488625667:web:019bcffa373aa7615e4636"
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({   
    prompt: "select_account"
});

export const signInWithGooglePopup = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    return idToken;
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw error;
  }
};
