import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, 
         GoogleAuthProvider, 
         signInWithPopup, 
         signOut, 
         onAuthStateChanged } 
         from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAupOVV2fWkLbOKVm8nYguFXSl2zV5fRrs",
  authDomain: "hilite-d13a1.firebaseapp.com",
  projectId: "hilite-d13a1",
  storageBucket: "hilite-d13a1.firebasestorage.app",
  messagingSenderId: "1030890224997",
  appId: "1:1030890224997:web:6e42ce9dfb8a214511758c",
  measurementId: "G-N3F6ZJT3R1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// // Attach event listeners to buttons
// window.onload = () => {
//   document.getElementById("login-btn").addEventListener("click", googleSignIn);
//   document.getElementById("logout-btn").addEventListener("click", logOut);
// };

// // Google Sign-In function
// async function googleSignIn() {
//   try {
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;
//     alert("Sign-in successful! Welcome, " + user.displayName);
//     console.log("User signed in:", user);
//   } catch (error) {
//     console.error("Error during Google sign-in:", error.message);
//     alert(error.message);
//   }
// }

// // Log Out function
// async function logOut() {
//   try {
//     await signOut(auth);
//     alert("You have logged out successfully.");
//     console.log("User logged out.");
//   } catch (error) {
//     console.error("Error during logout:", error.message);
//     alert(error.message);
//   }
// }

// // Listen for Authentication State Changes
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log("User is signed in:", user.displayName || user.email);
//   } else {
//     console.log("No user is signed in.");
//   }
// });

const PARENT_FRAME = document.location.ancestorOrigins[0];

// This demo uses the Google auth provider, but any supported provider works.
// Make sure that you enable any provider you want to use in the Firebase Console.
// https://console.firebase.google.com/project/_/authentication/providers
// const PROVIDER = new GoogleAuthProvider();

function sendResponse(result) {
  globalThis.parent.self.postMessage(JSON.stringify(result), PARENT_FRAME);
}

globalThis.addEventListener('message', function({data}) {
  if (data.initAuth) {
    // Opens the Google sign-in page in a popup, inside of an iframe in the
    // extension's offscreen document.
    // To centralize logic, all respones are forwarded to the parent frame,
    // which goes on to forward them to the extension's service worker.
    signInWithPopup(auth, provider)
      .then(sendResponse)
      .catch(sendResponse)
  }
});

// export const getFirebaseAuth = () => auth;
// export const getFirebaseApp = () => app;
