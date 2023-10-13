const reducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case "LOADING":
			return { ...state, isLoading: true };

		case "OPEN_INFO_MODAL":
			return { ...state, isInfoModalOpen: true };

		case "OPEN_REPORT_MODAL":
			return {
				...state,
				isReportModalOpen: true,
			};

		case "CLOSE_INFO_MODAL":
			return {
				...state,
				isInfoModalOpen: false,
			};

		case "CLOSE_REPORT_MODAL":
			return {
				...state,
				isReportModalOpen: false,
			};

		case "UPDATE_EVENTS":
			return {
				...state,
				events: payload.events ? payload.events : state.events,
				reportedEvents: payload.reportedEvents,
				isLoading: false,
			};

		case "UPDATE_DAYS":
			return {
				...state,
				limitDays: payload,
			};

		case "UPDATE_CURRENT_EVENT":
			return {
				...state,
				currentEvent: action.payload,
				isInfoModalOpen: true,
			};

		case "SET_CURRENT_COORDINATES":
			return {
				...state,
				currentCoordinates: payload,
			};

		case "SET_USER":
			return {
				...state,
				user: payload,
			};

		case "LOGOUT":
			return {
				...state,
				user: null,
			};

		case "SET_CENTRAL_COORDINATES":
			return { ...state, centralCoordinates: payload };

		default:
			throw new Error("No matching action type!");
	}
};

export default reducer;
