import store from "../../../redux/store";
// import { connectStorageEmulator } from "@firebase/storage";
import { render, screen } from "@testing-library/react";

// -------Inintializing fireBase--------------
import app from "../../../config/firebase";
// -------Inintializing fireBase--------------

import NewAdmin from "./NewAdmin";

import { Provider } from "react-redux";

test("renders NewAdmin component", () => {
    render(
        <Provider store={store}>
            <NewAdmin />
        </Provider>
    );

    const elm = screen.getByTestId("admin");
    expect(elm).toBeTruthy();
});
