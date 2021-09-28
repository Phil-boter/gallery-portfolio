import ReactDOM from "react-dom"; // will render code in DOM
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

let elem = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(elem, document.querySelector("main"));
