const Recent = () => {
	return (
		<select
			name="recent"
			className="recent"
		>
			<option value="recent">Recent</option>
			<option value="last-week">Last week</option>
			<option value="last-month">Last month</option>
			<option value="last-year">Last year</option>
		</select>
	);
};

export default Recent;
