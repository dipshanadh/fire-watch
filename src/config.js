import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyC87tMFlbC-WKeoJKAlSGBafg55xCkni1Q",
	authDomain: "firewatch-9ed62.firebaseapp.com",
	projectId: "firewatch-9ed62",
	storageBucket: "firewatch-9ed62.appspot.com",
	messagingSenderId: "547994341460",
	appId: "1:547994341460:web:59a3a8456f3ed923b1ddc1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export { auth, provider, db };
