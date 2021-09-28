import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

// -------Inintializing fireBase--------------
import app from "../../../config/firebase";
// -------Inintializing fireBase--------------

import AdminSection from "./AdminSection";

import store from "../../../redux/store";
// import { connectStorageEmulator } from "@firebase/storage";

it("renders adminSection  route", () => {
	const { container } = render(
		<Provider store={store}>
			<AdminSection />
		</Provider>
	);
	container.querySelector(".admin-section-container");
	expect(container).toBeTruthy();
});
