import React from "react";

function Pagination({ totalPosts, changePageSize, pageSize }) {
	return (
		<div className="flex justify-end gap-2 mt-10 mb-24">
			<span>items per page</span>
			<input
				type="number"
				min={1}
				max={totalPosts}
				className="border border-black rounded-md"
				onChange={(e) => changePageSize(e.target.value)}
			/>
			<span>
				1 - {totalPosts} of {totalPosts}
			</span>
		</div>
	);
}

export default Pagination;
