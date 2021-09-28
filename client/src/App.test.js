// import { connectStorageEmulator } from "@firebase/storage";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";

test("When page loads Main component should be rendered", () => {
    const { container } = render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    expect(container.querySelector(".app-container")).toBeTruthy();
});
