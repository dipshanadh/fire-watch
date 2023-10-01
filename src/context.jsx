import { useEffect, useReducer, createContext } from "react";

import reducer from "./reducer";

const url = "https://eonet.sci.gsfc.nasa.gov/api/v2.1/events";
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
		dispatch({ type: "LOADING" });

		const res = await fetch(url);
		const { events } = await res.json();

		dispatch({ type: "DISPLAY_MARKER", payload: events });
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
