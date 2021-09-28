import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import Projects from "./Projects";

import store from "../../redux/store";

test("renders Projects-route", () => {
	const { container } = render(
		<Provider store={store}>
			<Projects />
		</Provider>
	);
	container.querySelector(".projects");
	expect(container).toBeTruthy();
});

test("renders projects", () => {
	const { container } = render(
		<Provider store={store}>
			<Projects />
		</Provider>
	);
	container.querySelector(".project-main-image");
	expect(container).toBeTruthy();
});
