// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqspfucvLcBPvOx8gBEXVJ44VCLzcUTVM",
    authDomain: "polytrack124.firebaseapp.com",
    projectId: "polytrack124",
    storageBucket: "polytrack124.firebasestorage.app",
    messagingSenderId: "483611584187",
    appId: "1:483611584187:web:4f941561a90d16a2846b9e",
    measurementId: "G-TVHHZ9LBL3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Google Sign-In Function
function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(result => {
        console.log("User signed in:", result.user);
        document.getElementById("login-button").style.display = "none";
        loadGameData(result.user.uid); // Load data on login
    }).catch(error => {
        console.error("Sign-in error:", error);
    });
}

// Function to save game data (Only saves ONCE when user logs in)
function saveGameData(userId) {
    let gameData = localStorage.getItem("gameState");
    if (gameData) {
        setDoc(doc(db, "users", userId), { gameData: JSON.parse(gameData) })
        .then(() => {
            console.log("Game data saved once on login.");
        })
        .catch(error => {
            console.error("Error saving game data:", error);
        });
    }
}

// Function to load saved game data (Only loads ONCE when user logs in)
function loadGameData(userId) {
    getDoc(doc(db, "users", userId)).then(docSnap => {
        if (docSnap.exists()) {
            localStorage.setItem("gameState", JSON.stringify(docSnap.data().gameData));
            console.log("Game data loaded once on login:", docSnap.data().gameData);
        } else {
            console.log("No saved game data found.");
            saveGameData(userId); // Save only if no data exists
        }
    }).catch(error => {
        console.error("Error loading game data:", error);
    });
}

// Automatically check login state and load/save data once
onAuthStateChanged(auth, (user) => {
    if (user) {
        loadGameData(user.uid); // Load game data once
    }
});

// Add Google Sign-In button to the page
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.createElement("button");
    loginButton.id = "login-button";
    loginButton.innerText = "Sign in with Google";
    loginButton.onclick = signInWithGoogle;
    document.body.appendChild(loginButton);
});
