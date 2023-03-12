import React from "react";
import { useLocalStorage } from "./../../../hooks";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
	const { getData } = useLocalStorage();
	const user = getData("user") || null;
	if (!user) return <Navigate to={"/signin"} />;
	return <>{children}</>;
}

export default ProtectedRoute;
