import React, { useState } from "react";
import { MainContent, Container, Header } from "../../components";
import { useFetch } from "../../hooks";
import { Endpoints } from "../../data";

export function Home() {
	const [searchValue, setSearchValue] = useState();

	const submitFN = (value) => {
		setSearchValue(value);
	};

	return (
		<div className="w-[100vw] flex flex-col justify-center items-center">
			<Container>
				<Header handleSubmit={(value) => submitFN(value)} />
				<MainContent searchValue={searchValue} />
			</Container>
		</div>
	);
}

export default Home;
