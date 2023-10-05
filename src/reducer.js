const reducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case "LOADING":
			return { ...state, isLoading: true };

		case "OPEN_INFO_MODAL":
			return { ...state, isReportModalOpen: true };

		case "CLOSE_INFO_MODAL":
			return { ...state, isReportModalOpen: false };

		case "CLOSE_INFO_MODAL":
			return { ...state, isInfoModalOpen: false };

		case "UPDATE_EVENTS":
			return { ...state, events: payload, isLoading: false };

		case "UPDATE_CURRENT_EVENT":
			return {
				...state,
				currentEvent: action.payload,
				isInfoModalOpen: true,
			};

		default:
			throw new Error("No matching action type!");
	}
};

export default reducer;
