import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";

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

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("user-info").innerHTML = `Hello, ${user.displayName} (${user.email})`;
    } else {
        window.location.href = "index.html"; // Redirect back if not logged in
    }
});

// Logout function
document.getElementById("google-logout").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        console.error(error.message);
    });
});
