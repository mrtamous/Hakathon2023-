import React from "react";

export function useLocalStorage() {
	const storeData = (dataName, data) =>
		localStorage.setItem(dataName, JSON.stringify(data));
	const getData = (data) => JSON.parse(localStorage.getItem(data));
	return { storeData, getData };
}

export default useLocalStorage;
