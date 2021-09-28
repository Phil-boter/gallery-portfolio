export default function loginVerfication(
	firstName,
	lastName,
	email,
	password,
	form,
	errorMsg,
	successIcon,
	failureIcon
) {
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		engine(firstName, 0, "Username cannot be blank");
		engine(lastName, 0, "Username cannot be blank");
		engine(email, 1, "Email cannot be blank");
		engine(password, 2, "Password cannot be blank");
	});

	let engine = (id, serial, message) => {
		if (id.value.trim() === "") {
			errorMsg[serial].innerHTML = message;
			id.style.border = "2px solid red";

			// icons
			failureIcon[serial].style.opacity = "1";
			successIcon[serial].style.opacity = "0";
		} else {
			errorMsg[serial].innerHTML = "";
			id.style.border = "2px solid green";

			// icons
			failureIcon[serial].style.opacity = "0";
			successIcon[serial].style.opacity = "1";
		}
	};
}
