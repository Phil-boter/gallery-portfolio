import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { login } from "../../../redux/actions/authActions";

export default function Login() {
	const dispatch = useDispatch();
	const history = useHistory();

	const state = useSelector((state) => {
		return state;
	});

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [buttonText, setButtontext] = useState("");

	useEffect(() => {
		setButtontext("SignIn");
	}, []);

	useEffect(() => {
		if (state.admin.isLoggedIn === true) {
			history.goBack();
		} else if (state.admin.isLoggedIn === false) {
			setButtontext("Please create an account first");
			setTimeout(() => {
				setButtontext("check email/ password");
				setTimeout(() => {
					setButtontext("SignIn");
				}, 2000);
			}, 2000);
		} else {
			return;
		}
	}, [history, state.admin]);

	const handleEmail = (e) => {
		e.preventDefault();
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		e.preventDefault();
		setPassword(e.target.value);
	};

	const loginAdmin = () => {
		dispatch(login(email, password));
	};

	return (
		<>
			<div className="login" data-testid="login">
				<div className="login__container"></div>
				<form method="POST" id="login-form" className="form">
					<div>
						<input
							className="login__input email"
							type="text"
							name="email"
							placeholder="Email"
							onChange={(e) => handleEmail(e)}
							datatype-testid="email-input"
							value={email}
						></input>
					</div>
					<div>
						<input
							className="login__input password"
							type="password"
							name="password"
							placeholder="Password"
							onChange={(e) => handlePassword(e)}
							datatype-testid="password-input"
							value={password}
						></input>
					</div>
				</form>
				<div>
					<button
						disabled={(email.length < 1, password.length < 1)}
						className="toggle-button login__button"
						onClick={() => loginAdmin()}
					>
						{buttonText}
					</button>
				</div>
				{state.admin.error && <h1>Please signUp first</h1>}
			</div>
		</>
	);
}
