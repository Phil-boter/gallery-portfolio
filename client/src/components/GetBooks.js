import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getBooks } from "../redux/actions/bookActions";

import { useDispatch } from "react-redux";

function GetBooks() {
    const dispatch = useDispatch();

    const books = useSelector((state) => {
        return state.book.books;
    });

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    return (
        <div>
            <h1>hello getBopoks</h1>
        </div>
    );
}

export default GetBooks;
