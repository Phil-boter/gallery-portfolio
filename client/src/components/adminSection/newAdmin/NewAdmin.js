import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import { addAdmin, getAllAdmins } from "../../../redux/actions/authActions";

const Input = ({ handleFunction, type, name, placeholder, className }) => {
    return (
        <div>
            <label className="label" id="label" for={placeholder.toLowerCase()}>
                {placeholder}
            </label>
            <i className={className}></i>
            <input
                id={placeholder.toLowerCase()}
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={(e) => handleFunction(e)}
            />
            <i className="fas fa-exclamation-circle failure-icon"></i>
            <i className="far fa-check-circle success-icon"></i>
        </div>
    );
};

export default function NewAdmin({ state }) {
    const dispatch = useDispatch();

    const error = useSelector((state) => {
        return state.admin.error;
    });

    const [firstName, setFirst] = useState("");
    const [lastName, setLast] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [register, setShowregister] = useState(true);
    const [showMessage, setMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const handleFirst = (e) => {
        e.preventDefault();
        setFirst(e.target.value);
    };
    const handleLast = (e) => {
        e.preventDefault();
        setLast(e.target.value);
    };

    const handleEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };

    const showRegistration = (e) => {
        e.preventDefault();
        setShowregister(false);
    };

    const AddAdmin = (e) => {
        if (
            email.includes("@") &&
            firstName.length >= 1 &&
            lastName.length >= 1 &&
            password.length >= 6
        ) {
            e.preventDefault();
            dispatch(addAdmin(firstName, lastName, email, password));
            setMessage(true);
            setTimeout(() => {
                setMessage(false);
                setShowregister(true);
                dispatch(getAllAdmins());
            }, 2000);
        } else {
            setErrorMessage(true);
            setTimeout(() => {
                setErrorMessage(false);
            }, 1500);
        }
    };

    useEffect(() => {
        if (error === true) {
            setErrorMessage(true);
            setTimeout(() => {
                setErrorMessage(false);
            }, 1500);
        }
    }, [error]);

    return (
        <>
            <div className="container newadmin" data-testid="admin">
                {register ? (
                    <>
                        <button
                            onClick={(e) => showRegistration(e)}
                            className="toggle-button login"
                        >
                            Create a new administrator
                        </button>
                    </>
                ) : (
                    <>
                        <div>
                            <button
                                onClick={(e) => setShowregister(true)}
                                className="toggle-button login"
                            >
                                Close Input
                            </button>

                            <form
                                id="upload-form form"
                                method="POST"
                                autoComplete="off"
                            >
                                <Input
                                    handleFunction={(e) => handleFirst(e)}
                                    name="first"
                                    type="text"
                                    placeholder="First Name"
                                    className={"fas fa-user"}
                                />
                                <Input
                                    handleFunction={(e) => handleLast(e)}
                                    name="last"
                                    type="text"
                                    placeholder="Last Name"
                                    className={"fas fa-user"}
                                />
                                <Input
                                    handleFunction={(e) => handleEmail(e)}
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className={"fas fa-envelope"}
                                />
                                <Input
                                    handleFunction={(e) => handlePassword(e)}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className={"fas fa-lock"}
                                />
                                <div>
                                    <button
                                        type="submit"
                                        id="submit"
                                        className="toggle-button login"
                                        onClick={(e) => AddAdmin(e)}
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
                {showMessage && <h3>New Administrator created</h3>}
                {errorMessage && <h3>Please use valid credentials</h3>}
            </div>
        </>
    );
}
