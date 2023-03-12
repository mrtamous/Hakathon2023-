import React from "react";
import { Logo } from "../../img";

export function AuthWrapper({ children, title, description }) {
	return (
		<div className="flex items-center justify-center mt-16">
			<div className=" max-w-[320px] mx-5">
				{/* Logo */}
				<Logo width={"50px"} className={"mx-auto"} />
				{/* Title */}
				<h2 className="text-2xl font-bold">{title}</h2>
				<p className="text-base font-semibold mb-4 leading-5">{description}</p>
				{children}
			</div>
		</div>
	);
}

export default AuthWrapper;
