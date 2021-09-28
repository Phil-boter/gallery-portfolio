import React from "react";

import { useSelector } from "react-redux";

const SingleProject = ({ pro }) => {
	return (
		<div>
			<img
				className="project-main-image"
				src={pro.mainImage}
				alt={pro.title}
				style={{ width: 100, height: 100 }}
			/>
		</div>
	);
};

export default function Projects({ state }) {
	const projects = useSelector((state) => {
		return state.projects.projects;
	});
	return (
		<div className="projects">
			<h1>Welcome to Projects</h1>
			{projects &&
				projects.map((pro, index) => (
					<SingleProject key={index} pro={pro} />
				))}
		</div>
	);
}
