import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config";

import { useGlobalContext } from "../context";

const Auth = () => {
	const { user, setUser } = useGlobalContext();

	const handleLogin = () => {
		signInWithPopup(auth, provider).then(data => setUser(data.user));
	};

	const handleLogout = () => {};

	return user ? (
		<button className="auth">
			<img
				src={user.photoURL}
				alt={user.displayName}
				width="32px"
				height="32px"
				className="auth-img"
			/>
			{user.displayName}
		</button>
	) : (
		<button
			className="auth"
			onClick={handleLogin}>
			Login
		</button>
	);
};

export default Auth;
