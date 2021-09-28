import React from "react";

import { render, screen } from "@testing-library/react";
import Contact from "./Contact";

test("renders main-route", () => {
    const { container } = render(<Contact />);
    container.querySelector(".contact");
    expect(container).toBeTruthy();
});
