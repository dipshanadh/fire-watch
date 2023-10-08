import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBv9u6o1tQ3VkrgeTOhqo2Fj_uneX7d9ok",
	authDomain: "pokhariya-firewatch.firebaseapp.com",
	projectId: "pokhariya-firewatch",
	storageBucket: "pokhariya-firewatch.appspot.com",
	messagingSenderId: "737925005562",
	appId: "1:737925005562:web:2b7606a1d5bfb888148943",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export { auth, provider, db };
