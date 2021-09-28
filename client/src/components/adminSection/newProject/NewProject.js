import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getProjects } from "../../../redux/actions/projectActions";
import multipleFileUpload from "../../../utils/multipleFileUpload";

const File = ({ index, file, removeFile }) => {
	return (
		<div>
			<li>{file.name}</li>
			{index >= 0 ? <button onClick={removeFile}>remove</button> : null}
		</div>
	);
};

export default function NewProject({ state, storage }) {
	const dispatch = useDispatch();

	const [register, setShowregister] = useState(true);
	const [files, setFiles] = useState([]);
	const [mainImage, setMainImage] = useState({});
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleDescription = (e) => {
		setDescription(e.target.value);
	};

	const onFileChange = (e) => {
		for (let i = 0; i < e.target.files.length; i++) {
			const newFile = e.target.files[i];
			newFile["id"] = Math.random();
			// add an "id" property to each File object
			setFiles((prevState) => [...prevState, newFile]);
		}
	};

	const onSingleImageChange = (e) => {
		e.preventDefault();
		let fileInput = document.getElementById("mainImage");

		const image = fileInput.files[0];
		image["title"] = "mainImage";

		setMainImage(image);
	};

	const removeFile = (e) => {
		e.preventDefault();
		setFiles([...files].slice(0, -1));
	};

	const onUploadSubmission = (e, files, description, title, mainImage) => {
		e.preventDefault(); // prevent page refreshing
		multipleFileUpload(e, files, description, title, mainImage);
		resetForm(e);
		setTimeout(() => {
			console.log("dispatch");
			dispatch(getProjects());
		}, 6000);
	};

	const resetForm = (e) => {
		e.preventDefault();
		document.getElementById("upload-form").reset();
		console.log("reset");
		setFiles([]);
		setMainImage({});
		setShowregister(true);
	};

	return (
		<>
			<div className="">
				{register ? (
					<>
						<button
							onClick={(e) => setShowregister(false)}
							className="toggle-button login"
						>
							Create a new Project
						</button>
					</>
				) : (
					<>
						<div>
							<button
								onClick={(e) => resetForm(e)}
								className="toggle-button login"
							>
								Close Input
							</button>

							<form
								id="upload-form"
								method="POST"
								autoComplete="off"
							>
								<input
									type="text"
									placeholder="title"
									name="title"
									onChange={handleTitle}
									autoComplete="off"
								/>
								<textarea
									rows="4"
									cols="60"
									name="description"
									placeholder="Enter description"
									className="input-description"
									type="text"
									onChange={handleDescription}
									autoComplete="off"
								></textarea>
								<div>
									<label>
										Select Mainimage
										<input
											type="file"
											name="mainImage"
											id="mainImage"
											onChange={onSingleImageChange}
										/>
									</label>
								</div>
								<div>
									<label>
										Select Articleimages
										<input
											type="file"
											multiple
											onChange={onFileChange}
										/>
									</label>
									<button
										disabled={
											(title.length < 1,
											description.length < 1,
											files.length < 1)
										}
										onClick={(e) =>
											onUploadSubmission(
												e,
												files,
												description,
												title,
												mainImage
											)
										}
									>
										Upload
									</button>
								</div>
							</form>

							<ul>
								{mainImage && <p>{mainImage.name}</p>}
								{files &&
									files.map((file, index) => (
										<File
											key={index}
											index={index}
											file={file}
											removeFile={removeFile}
										/>
									))}
							</ul>
						</div>
					</>
				)}
			</div>
		</>
	);
}
