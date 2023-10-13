const isRecent = (date1, date2) => {
	const timeDifference = Math.abs(date2 - date1);

	const millisecondsIn24Hours = 24 * 60 * 60 * 1000;

	if (timeDifference < millisecondsIn24Hours) return true;
};

export default isRecent;
