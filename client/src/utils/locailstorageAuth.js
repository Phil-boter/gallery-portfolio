export default function authenticationoHandler(auth) {
	if (auth !== true) {
		window.location.replace("/");
	}
}
