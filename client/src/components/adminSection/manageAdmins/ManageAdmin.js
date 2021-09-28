import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmins, deleteAdmin } from "../../../redux/actions/authActions";

const SingleAdmin = ({ admin, index }) => {
	const dispatch = useDispatch();

	const handleDelete = (e, id) => {
		e.preventDefault();
		dispatch(deleteAdmin(id));
		setTimeout(() => {
			dispatch(getAllAdmins());
		}, 1000);
	};
	return (
		<div>
			<li>{admin.firstName}</li>
			<button onClick={(e) => handleDelete(e, admin.userId)}>
				Delete
			</button>
		</div>
	);
};

export default function ManageAdmins({ state, auth, storage }) {
	const admins = useSelector((state) => {
		return state.admin.allAdmins;
	});

	return (
		<div>
			<h1>greetings by manage admins</h1>
			<ul>
				{admins &&
					admins.map((admin, index) => (
						<SingleAdmin key={index} admin={admin} index={index} />
					))}
			</ul>
		</div>
	);
}
