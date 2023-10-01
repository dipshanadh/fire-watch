const reducer = (state, action) => {
	switch (action.type) {
		case "LOADING":
			return { ...state, isLoading: true };

		case "CLOSE_MODAL":
			return { ...state, isModalOpen: false };

		default:
			throw new Error("No matching action type!");
	}
};

export default reducer;
