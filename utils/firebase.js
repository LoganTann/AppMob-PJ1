import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyC_kBWLJBT57yFE4vArMPByc4XxXCStQtQ",
	authDomain: "kagescan-dev.firebaseapp.com",
	databaseURL: "https://kagescan-dev.firebaseio.com",
	projectId: "kagescan-dev",
	storageBucket: "kagescan-dev.appspot.com",
	messagingSenderId: "274057544232",
	appId: "1:274057544232:web:14f0719b187959f2f06b1d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);
