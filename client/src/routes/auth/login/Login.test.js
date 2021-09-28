import React from "react";
import { render, mount } from "@testing-library/react";
import { Provider } from "react-redux";

// -------Inintializing fireBase--------------
import app from "../../../config/firebase";
// -------Inintializing fireBase--------------

import Login from "./Login";

import store from "../../../redux/store";
import { connectStorageEmulator } from "@firebase/storage";

it("renders login component", () => {
	const { container } = render(
		<Provider store={store}>
			<Login />
		</Provider>
	);
	container.querySelector(".login");
	expect(container).toBeTruthy();
});

it("renders login form", () => {
	const { container } = render(
		<Provider store={store}>
			<Login />
		</Provider>
	);
	container.querySelector("#login-form");
	expect(container).toBeTruthy();
});

it("input email should be filled correctly", () => {
	const input = { email: "test@test.com", password: "1234" };
	const { container } = render(
		<Provider store={store}>
			<Login />
		</Provider>
	);

	const emailInput = container.querySelector(".email");
	emailInput.value = input.email;
	expect(emailInput.value).toBe("test@test.com");

	const passwordInput = container.querySelector(".password");
	passwordInput.value = input.password;
	expect(passwordInput.value).toBe("1234");
});
