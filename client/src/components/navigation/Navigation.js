import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import Logout from "../logout/Logout";

export default function Navigation({ state, auth, storage }) {
    console.log("auth", auth);
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const style1 = {
        transform: "rotate(45deg) translate(10.5px, 7.5px)",
    };
    const style2 = {
        opacity: 0,
    };
    const style3 = {
        transform: "rotate(-45deg) translate(7.5px, -5px)",
    };

    return (
        <div data-testid="navigation" className="navigation">
            <div className="navigation__header">
                <div className="navigation__logo-nav">
                    <div
                        className="navigation__logo-container"
                        onClick={closeMobileMenu}
                    >
                        <Link to="/">Gallery</Link>
                    </div>
                    <div className="navigation__options-container">
                        <ul
                            className={
                                click
                                    ? "navigation__nav-options active"
                                    : "navigation__nav-options"
                            }
                        >
                            <li
                                className="navigation__option"
                                onClick={closeMobileMenu}
                            >
                                <Link
                                    to="/contact"
                                    className="navigation__bg_slider link"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li
                                className="navigation__option"
                                onClick={closeMobileMenu}
                            >
                                <Link
                                    to="/about"
                                    className="navigation__bg_slider link"
                                >
                                    About
                                </Link>
                            </li>
                            <li
                                className="navigation__option"
                                onClick={closeMobileMenu}
                            >
                                <Link
                                    to="/projects"
                                    className="navigation__bg_slider link"
                                >
                                    Projects
                                </Link>
                            </li>
                            {auth !== true ? (
                                <li
                                    className="navigation__option"
                                    onClick={closeMobileMenu}
                                >
                                    <Link
                                        to="/login"
                                        className="navigation__bg_slider link"
                                    >
                                        SignIn
                                    </Link>
                                </li>
                            ) : (
                                <>
                                    <li
                                        className="navigation__option"
                                        onClick={closeMobileMenu}
                                    >
                                        <Link
                                            to="/adminsection"
                                            className="navigation__bg_slider link"
                                        >
                                            AdminSection
                                        </Link>
                                    </li>
                                    <li
                                        className="navigation__option"
                                        onClick={closeMobileMenu}
                                    >
                                        <Logout />
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="navigation__mobile-menu" onClick={handleClick}>
                    {click ? (
                        <span className="navigation__menu-icon navigation__navigation-burger">
                            <div
                                style={style1}
                                className="navigation__change navigation__burger navigation__bar1"
                            ></div>
                            <div
                                style={style2}
                                className="navigation__change navigation__burger navigation__bar2"
                            ></div>
                            <div
                                style={style3}
                                className="navigation__change navigation__burger navigation__bar3"
                            ></div>
                        </span>
                    ) : (
                        <span className="navigation__navigation-burger">
                            <div className="navigation__bar1"></div>
                            <div className="navigation__bar3"></div>
                            <div className="navigation__bar3"></div>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
