import { useEffect, useReducer, createContext, useContext } from "react";

import reducer from "./reducer";
import calculateDistance from "./utils/calculateDistance";

const eventUrl = "https://eonet.gsfc.nasa.gov/api/v3/events";

const AppContext = createContext();

const initialState = {
	events: [],
	tabOpen: "countries",
	isLoading: true,
	isInfoModalOpen: false,
	isReportModalOpen: false,
	currentEvent: {},
	currentCoordinates: [],
};

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const fetchData = async () => {
		const res = await fetch(eventUrl);
		const data = await res.json();

		const isWildFire = (category) => category.id === "wildfires";

		const events = data.events.filter((event) =>
			event.categories.some(isWildFire)
		);

		dispatch({ type: "UPDATE_EVENTS", payload: events });
	};

	const updateEvent = async (eventID) => {
		const event = state.events.find((event) => event.id === eventID);

		const res = await fetch(
			`https://nominatim.openstreetmap.org/reverse?lat=${event.geometry[0].coordinates[1]}&lon=${event.geometry[0].coordinates[0]}&format=json`
		);
		const data = await res.json();

		const coordinates = [
			Number(data.lat).toFixed(2),
			Number(data.lon).toFixed(2),
		];

		const currentEvent = {
			title: event.title,
			date: new Date(event.geometry[0].date).toLocaleDateString("en-us", {
				year: "numeric",
				month: "long",
				day: "numeric",
			}),
			location: data.address.city
				? `${data.address.city}, ${data.address.country}`
				: data.address.country,
			distance: calculateDistance(state.currentCoordinates, coordinates),
			link: event.sources[0].url,
			coordinates,
		};

		dispatch({ type: "UPDATE_CURRENT_EVENT", payload: currentEvent });
	};

	const closeInfoModal = () => {
		dispatch({ type: "CLOSE_INFO_MODAL" });
	};

	const openReportModal = () => {
		dispatch({ type: "OPEN_REPORT_MODAL" });
	};

	const closeReportModal = () => {
		dispatch({ type: "CLOSE_REPORT_MODAL" });
	};

	useEffect(() => {
		fetchData();

		navigator.geolocation.getCurrentPosition((pos) => {
			state.currentCoordinates = [
				pos.coords.latitude,
				pos.coords.longitude,
			];
		});
	}, []);

	return (
		<AppContext.Provider
			value={{
				...state,
				updateEvent,
				closeInfoModal,
				openReportModal,
				closeReportModal,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
