import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { SignupPage, SigninPage, Home } from "./pages";
import { ProtectedRoute } from "./features";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route path="signup" element={<SignupPage />} />
				<Route path="signin" element={<SigninPage />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
