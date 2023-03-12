import React from "react";

export function Button({ className = "", type = "submit", children, ...rest }) {
	return (
		<button
			className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
			type={type}
			{...rest}
		>
			{children}
		</button>
	);
}

export default Button;
