import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import MiniCard from "../miniCard";
import Modal from "../modal";

export default function ModalShare({ isOpen, closeModal, modalId }) {
	const [formData, setFormData] = useState({ email: "", access: "" });
	// const { fetchData, response, error, setError, loading } = useFetch(
	// 	Endpoints.posts.addNewPost(),
	// 	{
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: `Bearer ${getData("user").accessToken}`,
	// 			// Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjQwOWM4ZDdjMDM0YmEyMWJmODFjZTczIn0sImV4cCI6MTY4MDk4MTU3OCwiaWF0IjoxNjc4Mzg5NTc4fQ.L__A_37aOfQ49A5poEJTDd2yy6d9rVZyHQRxqL4rDpQ`,
	// 		},
	// 		body: JSON.stringify({ text: formData.post, image: formData.image }),
	// 	}
	// );
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<Modal isOpen={isOpen} closeModal={closeModal}>
			<div>
				<h3 className="text-lg font-bold mb-4">Share Post</h3>
			</div>
			<div className="mb-8">
				<MiniCard className="flex w-72 !py-2 mb-3 hover:border-blue border-none">
					<div className="flex justify-between items-start flex-row-reverse">
						<form>
							<Input
								type="email"
								name="email"
								label="Email"
								inputClasses="w-[320px]"
								value={formData.email}
								onChange={handleChange}
							/>
							<p>General access</p>
							<div className="flex gap-3">
								<Input
									type="radio"
									id="huey"
									name="access"
									value="Viewed only"
									checked={formData.access === "Viewed only"}
									onChange={handleChange}
								/>
								<label for="huey">Viewed only</label>
							</div>

							<div className="flex gap-3 mb-5">
								<input
									type="radio"
									id="huey"
									name="access"
									value="Viewed only and edit"
									checked={formData.access === "Viewed only and edit"}
									onChange={handleChange}
								/>
								<label for="dewey">Viewed only and edit</label>
							</div>

							<div className="flex gap-2 justify-between">
								<Button
									className="w-full bg-white border text-black"
									onClick={closeModal}
									type="button"
								>
									Cancel
								</Button>
								<Button className="w-full">Add</Button>
							</div>
						</form>
					</div>
				</MiniCard>
			</div>
		</Modal>
	);
}
