import React from "react";

export function Input({
	label,
	type,
	labelClasses = "",
	inputClasses = "",
	name,
	placeholder = "",
	handleChange = () => {},
	isError,
}) {
	return (
		<div className="form-group">
			{label && (
				<label
					className={`block text-gray-700 text-sm font-bold mb-2 ${labelClasses}`}
					forHTML={name}
				>
					{label}
				</label>
			)}
			<input
				className={`border border-gray-600 rounded w-full py-2 px-3 text-gray-700 leading-tight ${inputClasses} ${
					isError ? "border-red-700" : ""
				}`}
				id={name}
				name={name}
				type={type}
				placeholder={placeholder}
				onChange={handleChange}
			/>
			<small className="text-xs"></small>
		</div>
	);
}

export default Input;
