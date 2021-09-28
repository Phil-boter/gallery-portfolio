import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ManageAdmins from "../../../components/adminSection/manageAdmins/ManageAdmin";
import ManageProjects from "../../../components/adminSection/manageProjects/ManageProjects";
import NewAdmin from "../../../components/adminSection/newAdmin/NewAdmin";
import NewProject from "../../../components/adminSection/newProject/NewProject";
import { getAllAdmins } from "../../../redux/actions/authActions";
import authenticationoHandler from "../../../utils/locailstorageAuth";

export default function AdminSection({ state, storage, auth }) {
	const dispatch = useDispatch();
	const projects = useSelector((state) => {
		return state.projects;
	});

	useEffect(() => {
		authenticationoHandler(auth);
		dispatch(getAllAdmins());
	}, [auth, projects, dispatch]);
	return (
		<div>
			<h1>welcome to AdminSection</h1>
			<ManageAdmins state={state} storage={storage} auth={auth} />
			<NewAdmin state={state} storage={storage} auth={auth} />
			<NewProject state={state} storage={storage} auth={auth} />
			<ManageProjects
				state={state}
				storage={storage}
				auth={auth}
				projects={projects}
			/>
		</div>
	);
}
