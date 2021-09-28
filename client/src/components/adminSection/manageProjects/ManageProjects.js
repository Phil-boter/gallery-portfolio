import React from "react";
import { useDispatch } from "react-redux";
import {
	deleteProject,
	getProjects,
} from "../../../redux/actions/projectActions";

const Deletecomp = ({ project, index }) => {
	const dispatch = useDispatch();

	const handleDelete = (e, id) => {
		e.preventDefault();
		dispatch(deleteProject(id));
		dispatch(getProjects());
	};

	return (
		<div>
			<li>{project.title}</li>
			<button onClick={(e) => handleDelete(e, project.id)}>delete</button>
		</div>
	);
};

export default function ManageProjects({ auth, state, storage, projects }) {
	console.log("pro", projects);
	if (!projects.projects) {
		return <>loading...</>;
	}

	return (
		<>
			<h1>Hello manager</h1>
			<ul>
				{projects.projects &&
					projects.projects.map((project, index) => (
						<Deletecomp
							key={index}
							project={project}
							index={index}
						/>
					))}
			</ul>
		</>
	);
}
