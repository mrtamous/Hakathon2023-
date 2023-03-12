import React, { useState } from "react";
import AuthWrapper from "../wrapper";
import { Button, Input } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import { Endpoints } from "./../../../data";
import { useFetch, useLocalStorage } from "./../../../hooks";

export function Signin() {
	const [value, setValue] = useState("");
	const navigate = useNavigate();
	const { storeData } = useLocalStorage();
	const { fetchData, response, error, loading, setError } = useFetch(
		Endpoints.authentication.signin,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: value }),
		}
	);
	function handleSubmit(e) {
		e.preventDefault();
		if (!value.trim()) {
			setError("Field is reuqired!");
			return;
		}
		fetchData();
	}
	if (response && !error) {
		storeData("user", response.data);
		navigate("/");
	}

	return (
		<AuthWrapper
			title={"Login"}
			description={"Fill the following information to create an account"}
		>
			<div className="w-full">
				<form className="" onSubmit={handleSubmit}>
					<div className="mb-10">
						<Input
							type={"email"}
							name={"email"}
							label={"Email"}
							isError={error}
							handleChange={(e) => setValue(e.target.value)}
						/>
					</div>
					<Button className={`w-full ${error ? "" : "mb-7"}`}>
						{!loading ? "Sign In" : "Loading.."}
					</Button>
					{error && (
						<small className="text-xs text-red-700 text-center mb-7">
							{error}
						</small>
					)}
					<div className="flex items-center justify-center gap-1">
						<p className="font-semibold">Don't have an account?</p>
						<Link
							className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 "
							to={"/signup"}
						>
							Sign up
						</Link>
					</div>
				</form>
			</div>
		</AuthWrapper>
	);
}

export default Signin;
