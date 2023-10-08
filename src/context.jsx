import { useEffect, useReducer, createContext, useContext } from "react";

import reducer from "./reducer";
import calculateDistance from "./utils/calculateDistance";

const eventUrl = "https://eonet.gsfc.nasa.gov/api/v3/events?days=";

const AppContext = createContext();

const initialState = {
	events: [],
	tabOpen: "countries",
	isLoading: true,
	isInfoModalOpen: false,
	isReportModalOpen: false,
	currentEvent: {},
	currentCoordinates: [],
	limitDays: null,
	user: null,
	centralCoordinates: [40.758701, -111.876183],
};

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const fetchData = async () => {
		dispatch({ type: "LOADING" });

		const res = await fetch(eventUrl + state.limitDays);
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

	const setUser = (user) => {
		localStorage.setItem("user", JSON.stringify(user));
		dispatch({ type: "SET_USER", payload: user });
	};

	const handleChange = (value) => {
		switch (value) {
			case "recent":
				dispatch({ type: "UPDATE_DAYS", payload: 3 });
				break;

			case "last-week":
				dispatch({ type: "UPDATE_DAYS", payload: 7 });
				break;

			case "last-month":
				dispatch({ type: "UPDATE_DAYS", payload: 30 });
				break;

			case "last-year":
				dispatch({ type: "UPDATE_DAYS", payload: 365 });
				break;
		}
	};

	const setCentralCoordinates = (coordinates) => {
		dispatch({ type: "SET_CENTRAL_COORDINATES", payload: coordinates });
	};

	useEffect(() => {
		fetchData();

		if ("geolocation" in navigator)
			navigator.geolocation.getCurrentPosition((pos) => {
				dispatch({
					type: "SET_CURRENT_COORDINATES",
					payload: [pos.coords.latitude, pos.coords.longitude],
				});
			});
		else
			alert(
				"Some functinalities may not available, since location is not available."
			);

		if (localStorage.getItem("user"))
			dispatch({
				type: "SET_USER",
				payload: JSON.parse(localStorage.getItem("user")),
			});
	}, [state.limitDays]);

	return (
		<AppContext.Provider
			value={{
				...state,
				updateEvent,
				closeInfoModal,
				openReportModal,
				closeReportModal,
				handleChange,
				setUser,
				setCentralCoordinates,
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
