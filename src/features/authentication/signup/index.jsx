import React, { useState } from "react";
import AuthWrapper from "../wrapper";
import { Button, Input } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage, useFetch } from "./../../../hooks";
import { Endpoints } from "../../../data";

export function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const navigate = useNavigate();
	const { storeData } = useLocalStorage();
	const { fetchData, response, error, loading, setError } = useFetch(
		Endpoints.authentication.signup,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: name, email: email }),
		}
	);
	function handleSubmit(e) {
		e.preventDefault();
		if (!name.trim() && !email.trim()) {
			setError("Fields are reuqired!");
			return;
		}
		fetchData();
	}

	if (response) {
		navigate("/signin");
	}
	console.log(error);
	return (
		<AuthWrapper
			title={"Sign Up"}
			description={"Fill the following information to create an account"}
		>
			<div className="w-full">
				<form className="" onSubmit={handleSubmit}>
					<div className="mb-4">
						<Input
							type={"text"}
							name={"name"}
							label={"Name"}
							isError={error}
							handleChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="mb-10">
						<Input
							type={"email"}
							name={"email"}
							label={"Email"}
							isError={error}
							handleChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<Button className={`w-full ${error ? "" : "mb-7"}`}>
						{loading ? "Loading..." : "Sign Up"}
					</Button>
					{error && (
						<small className="text-xs text-red-700 text-center mb-7">
							{error}
						</small>
					)}
					<div className="flex items-center justify-center gap-1">
						<p className="font-semibold">Already have an Account?</p>
						<Link
							className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 "
							to={"/signin"}
						>
							Login
						</Link>
					</div>
				</form>
			</div>
		</AuthWrapper>
	);
}

export default Signup;
