import { useEffect, useReducer, createContext, useContext } from "react";

import reducer from "./reducer";

const url = "https://eonet.gsfc.nasa.gov/api/v3/events";
const AppContext = createContext();

const initialState = {
	events: [],
	tabOpen: "countries",
	isLoading: true,
	isModalOpen: false,
};

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const fetchData = async () => {
		const res = await fetch(url);
		const data = await res.json();

		const isWildFire = category => category.id == "wildfires";

		const events = data.events.filter(event =>
			event.categories.some(isWildFire)
		);

		dispatch({ type: "UPDATE_EVENTS", payload: events });
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<AppContext.Provider value={{ ...state }}>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
