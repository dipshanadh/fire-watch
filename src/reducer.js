const reducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case "LOADING":
			return { ...state, isLoading: true };

		case "CLOSE_MODAL":
			return { ...state, isModalOpen: false };

		case "UPDATE_EVENTS":
			console.log();
			return { ...state, events: payload, isLoading: false };

		default:
			throw new Error("No matching action type!");
	}
};

export default reducer;
