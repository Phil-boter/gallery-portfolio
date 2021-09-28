import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";

// css rules in navigation.scss  ---->> &__option .label-logout

export default function Logout() {
	function logout() {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				console.log(" Sign-out successful.");
				window.localStorage.clear();
				window.location.replace("/");
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const Logout = (e) => {
		e.preventDefault();
		console.log("logout");
		logout();
	};
	return (
		<label
			className="navigation__bg_slider link label-logout"
			onClick={(e) => Logout(e)}
			data-testid="logout"
		>
			SignOut
		</label>
	);
}
