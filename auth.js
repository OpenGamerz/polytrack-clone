// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXqdJcFUuIhfaoUnFx7xlRKJV2zKUdfK8",
  authDomain: "m461-c4541.firebaseapp.com",
  projectId: "m461-c4541",
  storageBucket: "m461-c4541.appspot.com",
  messagingSenderId: "529850260966",
  appId: "1:529850260966:web:6fe2f4702ffd4e2d894a27",
  measurementId: "G-TVJBRB7K01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Login function
document.getElementById("google-login").addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            window.location.href = "dashboard.html"; // Redirect after login
        })
        .catch((error) => {
            console.error(error.message);
        });
});

// Logout function
document.getElementById("google-logout").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html"; // Redirect back to login page
    }).catch((error) => {
        console.error(error.message);
    });
});

// Auto-redirect if user is logged in
onAuthStateChanged(auth, (user) => {
    if (user && window.location.pathname === "/index.html") {
        window.location.href = "poly.html"; // Redirect logged-in users
    }
});
