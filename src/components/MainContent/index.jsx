import React, { useEffect, useState } from "react";
import AddItem from "../../components/SVG/AddItem";
import Container from "../../components/Container";
import ListOfPost from "../../components/ListOfPost";
import Post from "../Post";
import { useFetch, useModal, useLocalStorage } from "../../hooks";
import ModalAdd from "../../components/modalAdd";
import { Endpoints } from "./../../data";
import Pagination from "../Pagination";
// import { paginate } from "./../../utils/paginate";

export const MainContent = ({ searchValue }) => {
	const [posts, setPosts] = useState([]);
	const modalAdd = useModal();
	const { getData } = useLocalStorage();
	const { fetchData, response, error, setError, loading } = useFetch(
		Endpoints.posts.getAllPosts(0, 50),
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${getData("user").accessToken}`,
			},
		}
	);
	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (response) setPosts(response.data.posts);
	}, [response]);

	function handleEditPost(id, data) {
		let myPosts = [...posts];
		const postIndex = posts.findIndex((p) => p._id == id);
		myPosts[postIndex].text = data.text;
		myPosts[postIndex].image = data.image;
		setPosts(() => myPosts);
	}
	function handleDeletePost(id) {
		let myPostts = posts.filter((p) => p._id !== id);
		setPosts(myPostts);
	}
	function handleAddPost(addedPost) {
		setPosts([{ ...addedPost }, ...posts]);
	}
	function changePageSize(value) {
		setPageSize(value);
	}
	const searchedPosts = searchValue
		? [...posts].filter((p) => p.text.includes(searchValue))
		: posts;
	const [pageSize, setPageSize] = useState();
	// const paginatedPosts = paginate(searchedPosts, pageSize);

	return (
		<main className="Main flex flex-col justify-between items-center">
			<Container>
				<div className=" w-full flex justify-between items-center mb-6">
					<h2 className=" text-xl font-bold">List of post</h2>
					<div>
						<button onClick={modalAdd.openModal}>
							<AddItem />
						</button>
						<ModalAdd
							isOpen={modalAdd.isOpen}
							closeModal={modalAdd.closeModal}
							handleAdd={(text, image) => handleAddPost(text, image)}
						/>
					</div>
				</div>
				<ListOfPost>
					{error && <div> {error} </div>}
					{loading && <div> Loading ...</div>}
					{searchedPosts &&
						searchedPosts.map((post) => {
							return (
								<Post
									key={post._id}
									Name={post.user.name}
									PostText={post.text}
									PostImage={post.image}
									id={post._id}
									handleEditPost={(data) => handleEditPost(post._id, data)}
									handleDeletePost={() => handleDeletePost(post._id)}
								/>
							);
						})}
				</ListOfPost>
				{!loading && (
					<Pagination
						totalPosts={posts.length}
						changePageSize={changePageSize}
						// pageSize={pageSize}
					/>
				)}
			</Container>
		</main>
	);
};

export default MainContent;
