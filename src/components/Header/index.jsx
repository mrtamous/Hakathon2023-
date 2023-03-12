import React, { useState } from "react";
import Logo from "../../components/SVG/Logo";
import Person from "../../components/SVG/Person";
import Input from "../Input";
import Search from "../SVG/Search";
import { Endpoints } from "../../data";
import { useLocalStorage } from "./../../hooks/useLocalStorage/index";

export const Header = ({ handleSubmit }) => {
	const [search, setSearch] = useState(null);
	const {
		data: { name },
	} = useLocalStorage().getData("user");
	const handleChange = (e) => {
		const value = e.target.value;
		if (value.trim().length == 0) {
			setSearch(null);
			return;
		}
		setSearch(e.target.value);
	};

	return (
		<header className="Header flex justify-between w-full h-36">
			<div className="Logo flex justify-center items-center">
				<Logo />
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit(search);
				}}
				className="flex items-center justify-center"
			>
				<div className="flex items-center justify-center">
					<Input
						inputClasses={"w-[550px]"}
						type={"text"}
						name={"Search"}
						placeholder={"Search"}
						handleChange={handleChange}
					>
						<Search />
					</Input>
				</div>
			</form>
			<div className="flex justify-between items-center">
				<h2>{name}</h2>
				<Person />
			</div>
		</header>
	);
};

export default Header;
