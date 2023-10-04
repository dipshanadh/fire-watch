const reducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case "LOADING":
			return { ...state, isLoading: true };

		case "CLOSE_MODAL":
			return { ...state, isModalOpen: false };

		case "UPDATE_EVENTS":
			return { ...state, events: payload, isLoading: false };

		case "UPDATE_CURRENT_EVENT":
			return {
				...state,
				currentEvent: action.payload,
				isModalOpen: true,
			};

		default:
			throw new Error("No matching action type!");
	}
};

export default reducer;
