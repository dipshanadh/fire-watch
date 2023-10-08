import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config";

import { useGlobalContext } from "../context";

const Auth = () => {
	const { user, setUser } = useGlobalContext();

	const handleLogin = () => {
		signInWithPopup(auth, provider).then((data) => setUser(data.user));
	};

	const handleLogout = () => {
		localStorage.removeItem("user");
		location.reload();
	};

	return user ? (
		<div className="user-container">
			<div className="user">
				<img
					src={user.photoURL}
					alt={user.displayName}
					width="36px"
					height="36px"
					className="user-img"
				/>
				{user.displayName}
			</div>
			<button
				className="auth logout"
				onClick={handleLogout}
			>
				Logout
			</button>
		</div>
	) : (
		<button
			className="auth login"
			onClick={handleLogin}
		>
			Login
		</button>
	);
};

export default Auth;
