const newAPI = "https://hakathon2023.onrender.com/api";
export const Endpoints = {
	authentication: {
		signin: "https://hakathon2023.onrender.com/api/auth/login",
		signup: "https://hakathon2023.onrender.com/api/auth/signup",
	},
	posts: {
		addNewPost: () => `${newAPI}/post/add`,
		updatePost: (id) => `${newAPI}/post/update/${id}`,
		deletePost: (id) => `${newAPI}/post/delete/${id}`,
		getPostDetails: (id) => `${newAPI}/post/details/${id}`,
		getAllPosts: (offset, limit) =>
			`${newAPI}/post/list?offset=${offset}&limit=${limit}`,
		sharePost: (id) => `${newAPI}/post/share/${id}`,
	},
};

export default Endpoints;
