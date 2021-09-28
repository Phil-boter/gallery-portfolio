import React from "react";
import { render, screen } from "@testing-library/react";

import Main from "./Main";

test("renders main-route", () => {
	const { container } = render(<Main />);
	container.querySelector(".main");
	expect(container).toBeTruthy();
});
