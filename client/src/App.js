import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// -------Inintializing fireBase--------------
import app from "./config/firebase";
// -------Inintializing fireBase--------------

import Navigation from "./components/navigation/Navigation";
import Login from "./routes/auth/login/Login";
import Contact from "./routes/Contact/Contact";
import Main from "./routes/Main/Main";
import Projects from "./routes/Projects/Projects";
import About from "./routes/About/About";
import AdminSection from "./routes/admin/adminSection/AdminSection";
import { getProjects } from "./redux/actions/projectActions";

function App() {
    const dispatch = useDispatch();
    const state = useSelector((state) => {
        return state;
    });
    const admin = useSelector((state) => {
        return state.admin.admin;
    });
    console.log("state in APP", state);
    const [auth, setAuthenticated] = useState(false);
    const [storage, setStorage] = useState({});

    function getAdminDataFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem("admin"));
        if (data) {
            setAuthenticated(true);
            setStorage(data);
        } else {
            console.log("noo data in localstorage");
        }
    }

    useEffect(() => {
        getAdminDataFromLocalStorage();
        dispatch(getProjects());
    }, [admin]);

    return (
        <>
            <div className="app-container">
                <BrowserRouter>
                    <Navigation state={state} storage={storage} auth={auth} />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Main
                                    state={state}
                                    auth={auth}
                                    storage={storage}
                                />
                            )}
                        />
                        <Route path="/login" render={() => <Login />} />
                        <Route
                            path="/contact"
                            render={() => (
                                <Contact
                                    state={state}
                                    auth={auth}
                                    storage={storage}
                                />
                            )}
                        />
                        <Route
                            path="/projects"
                            render={() => (
                                <Projects
                                    state={state}
                                    auth={auth}
                                    storage={storage}
                                />
                            )}
                        />
                        <Route
                            path="/about"
                            render={() => (
                                <About
                                    state={state}
                                    auth={auth}
                                    storage={storage}
                                />
                            )}
                        />
                        <Route
                            path="/adminsection"
                            render={() => (
                                <AdminSection
                                    state={state}
                                    auth={auth}
                                    storage={storage}
                                />
                            )}
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
