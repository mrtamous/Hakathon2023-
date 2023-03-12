import React, { useState } from "react";
import PlaceHolderImg from "../SVG/PlaceHolderImg";
import ThereDot from "../SVG/ThereDot";
import Search from "../SVG/Search";
import Share from "../SVG/Share";
import Edite from "../SVG/Edite";
import Delete from "../SVG/Delete";
import useModal from "../../hooks/useModal";
import ModalEdit from "../../components/modalEdit";
import ModalShare from "../../components/modalShare";
import { Endpoints } from "../../data";
import { useFetch } from "../../hooks";
import { useLocalStorage } from "./../../hooks/useLocalStorage/index";

const Post = ({
	Name,
	PostText,
	id,
	PostImage,
	handleEditPost,
	handleDeletePost,
}) => {
	const { getData } = useLocalStorage();
	const {
		fetchData: fetchDeletePost,
		response,
		error: deleteError,
		setError,
		loading: deleteLoading,
	} = useFetch(Endpoints.posts.deletePost(id), {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${getData("user").accessToken}`,
			// Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjQwOWM4ZDdjMDM0YmEyMWJmODFjZTczIn0sImV4cCI6MTY4MDk4MTU3OCwiaWF0IjoxNjc4Mzg5NTc4fQ.L__A_37aOfQ49A5poEJTDd2yy6d9rVZyHQRxqL4rDpQ`,
		},
	});

	const modalEdit = useModal();
	const modalShare = useModal();

	const [isEditVisble, setIsEditVisble] = useState(false);
	const [isShareVisble, setIsShareVisble] = useState(false);

	const handelEdit = () => {
		setIsEditVisble((pre) => !pre);
	};

	const handelShare = (id) => {
		setIsShareVisble((pre) => !pre);
	};

	return (
		<div className="Post flex items-start p-5 gap-4 rounded-md border border-[#BEC2C6] my-4">
			{deleteError && <p className="text-xs text-red-700">{deleteError}</p>}
			{deleteLoading ? (
				"Loading.."
			) : (
				<>
					<div className="ImgForPesron rounded-full bg-[#F5F5F5]  w-32 h-32 flex items-center justify-center">
						<div className=" w-12 text-[#A5A5A5]">
							<PlaceHolderImg />
						</div>
					</div>
					<div className=" flex flex-col gap-2 justify-between pb-5 w-4/5">
						<div className=" w-full gap-1 flex justify-between">
							<h3 className="Name font-bold">{Name}</h3>
							<div
								className=" w-4 text-[#2D65E4] cursor-pointer relative"
								onClick={handelEdit}
							>
								<ThereDot />

								{isEditVisble && (
									<div className="SettingOption absolute right-5 flex flex-col p-5 gap-2 top-0 rounded-md border border-[#BEC2C6] z-10 bg-white">
										<div className=" flex gap-5 cursor-pointer items-center ">
											<button onClick={modalEdit.openModal}>
												<span className="flex gap-4">
													<Edite />
													Edit
												</span>
											</button>
										</div>

										<div
											className=" flex gap-5 justify-center items-center cursor-pointer"
											onClick={() => {
												fetchDeletePost().then(() => handleDeletePost());
											}}
										>
											<span className=" w-4">
												<Delete />
											</span>
											Delete
										</div>
									</div>
								)}
								<ModalEdit
									post={PostText}
									modalId={id}
									isOpen={modalEdit.isOpen}
									closeModal={modalEdit.closeModal}
									image={PostImage}
									handelEdit={handleEditPost}
								/>
							</div>
						</div>
						<div className="relative">
							<p className=" w-4/5">{PostText}</p>
						</div>
						<div className="Search w-full cursor-pointer flex justify-end text-[#2D65E4] mt-5">
							<div className=" w-5" onClick={(id) => handelShare(id)}>
								<button type="submit" onClick={modalShare.openModal}>
									<Share />
								</button>
								<ModalShare
									modalId={id}
									isOpen={modalShare.isOpen}
									closeModal={modalShare.closeModal}
								/>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Post;
