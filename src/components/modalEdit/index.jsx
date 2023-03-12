import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import MiniCard from "../miniCard";
import Modal from "../modal";
import { Endpoints } from "../../data";
import { useFetch } from "../../hooks";
import InputSvg from "../SVG/InputSvg";
import { useLocalStorage } from "./../../hooks/useLocalStorage/index";

export default function ModalEdit({
	isOpen,
	closeModal,
	modalId,
	post,
	image,
	handelEdit,
}) {
	const [formData, setFormData] = useState({ post: post, image: "" });
	const { getData } = useLocalStorage();
	const { fetchData, response, error, setError, loading } = useFetch(
		Endpoints.posts.updatePost(modalId),
		{
			method: "PUT",
			headers: {
				// Authorization: `Bearer ${getData("user")}`,
				"Content-Type": "application/json",
				Authorization: `Bearer ${getData("user").accessToken}`,
			},
			body: JSON.stringify({ text: formData.post, image: formData.image }),
		}
	);

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name == "image") {
			setFormData({ ...formData, image: event.target.files[0] });
			return;
		}
		setFormData({ ...formData, post: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.post.trim()) {
			setError("Fields can't be empty!");
			return;
		}
		fetchData();
		if (!loading) {
			closeModal();
			handelEdit({ text: formData.post, image: formData.image });
		}
	};
	return (
		<>
			<Modal isOpen={isOpen} closeModal={closeModal}>
				<div>
					<h3 className="text-lg font-bold mb-4">Edit Post</h3>
				</div>
				<div className="mb-8">
					<MiniCard className="!py-2 mb-3 hover:border-blue border-none">
						<div className="flex justify-center items-start flex-row-reverse">
							<form onSubmit={handleSubmit}>
								{/* <Input type="text" name="post"  /> */}
								<textarea
									type="text"
									className="w-full h-28 border py-2 px-3 border-gray-600 rounded"
									name="post"
									value={formData.post}
									onChange={(e) =>
										setFormData({ ...formData, post: e.target.value })
									}
								/>

								<div>
									{formData.image === "" ? (
										<label
											htmlFor="image"
											className="flex flex-col items-center justify-center"
										>
											<h2>Upload your image</h2>
											<div>
												<InputSvg />
											</div>
											<h2>Drage and drop or browse to choose a file</h2>
										</label>
									) : (
										<div className=" w-52 h-52 overflow-hidden rounded-full shadow-lg cursor-pointer">
											<img
												src={window.URL.createObjectURL(formData.image)}
												alt="selected file"
												onClick={() => setFormData({ post: "", image: "" })}
											/>
										</div>
									)}
								</div>
								<div className=" hidden">
									<Input
										type="file"
										name="image"
										value={formData.image}
										handleChange={(e) => handleChange(e)}
									/>
								</div>

								<div className="flex gap-2 justify-between mt-5">
									<Button
										className="w-full bg-white border text-black"
										type="button"
										onClick={closeModal}
									>
										Cancel
									</Button>
									<Button className="w-full" type="submit">
										{loading ? "Loading..." : "Edit"}
									</Button>
								</div>
								<div className="text-center text-red-700 text-xs">
									{error && error}
								</div>
							</form>
						</div>
					</MiniCard>
				</div>
			</Modal>
		</>
	);
}
