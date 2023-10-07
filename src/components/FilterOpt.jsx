const FilterOpt = () => {
	return (
		<div className="custom-select">
			<select
				name="filter"
				className="filter"
			>
				<option value="recent">Recent</option>
				<option value="last-week">Last week</option>
				<option value="last-month">Last month</option>
				<option value="last-year">Last year</option>
			</select>
			<span className="custom-arrow">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					width="18px"
					height="18px"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M19.5 8.25l-7.5 7.5-7.5-7.5"
					/>
				</svg>
			</span>
		</div>
	);
};

export default FilterOpt;
