import {
	useEffect,
	useReducer,
	createContext,
	useContext,
	useRef,
} from "react";
import { getDocs, collection, onSnapshot, query } from "firebase/firestore";
import { toast } from "react-toastify";

import reducer from "./reducer";
import { db } from "./config";

import calculateDistance from "./utils/calculateDistance";
import isRecent from "./utils/isRecent";
import { formatDateAgo, convertDate } from "./utils/formatDate";

const eventUrl = "https://eonet.gsfc.nasa.gov/api/v3/events?days=";

const AppContext = createContext();

const initialState = {
	events: [],
	reportedEvents: [],
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
	const effectRan = useRef(false);
	const [state, dispatch] = useReducer(reducer, initialState);

	const reportsRef = collection(db, "reports");

	const fetchData = async () => {
		dispatch({ type: "LOADING" });

		const res = await fetch(eventUrl + state.limitDays);
		const data = await res.json();

		const isWildFire = category => category.id === "wildfires";

		const events = data.events.filter(event =>
			event.categories.some(isWildFire)
		);

		const reportedEvents = await getDocs(reportsRef);

		dispatch({
			type: "UPDATE_EVENTS",
			payload: {
				events,
				reportedEvents: reportedEvents.docs.map(doc => ({
					...doc.data(),
					id: doc.id,
				})),
			},
		});
	};

	const updateEvent = async eventID => {
		const event =
			state.events.find(event => event.id === eventID) ||
			state.reportedEvents.find(event => event.id === eventID);

		const res = await fetch(
			`https://nominatim.openstreetmap.org/reverse?lat=${event.geometry[0].coordinates[1]}&lon=${event.geometry[0].coordinates[0]}&format=json`
		);
		const data = await res.json();

		const coordinates = [Number(data.lat), Number(data.lon)];

		if (data.error) {
			alert(data.error);
			closeInfoModal();
			return;
		}

		const currentEvent = {
			title: event.title,
			date: convertDate(event.geometry[0].date),
			location: data.address.city
				? `${data.address.city}, ${data.address.country}`
				: data.address.country,
			distance: calculateDistance(state.currentCoordinates, coordinates),
			link: event.sources && event.sources[0].url,
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

	const setUser = user => {
		localStorage.setItem("user", JSON.stringify(user));
		dispatch({ type: "SET_USER", payload: user });
	};

	const handleChange = value => {
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

	const setCentralCoordinates = coordinates => {
		dispatch({ type: "SET_CENTRAL_COORDINATES", payload: coordinates });
	};

	useEffect(() => {
		fetchData();

		if (effectRan.current === false) {
			if ("geolocation" in navigator)
				navigator.geolocation.getCurrentPosition(pos =>
					dispatch({
						type: "SET_CURRENT_COORDINATES",
						payload: [pos.coords.latitude, pos.coords.longitude],
					})
				);
			else
				alert(
					"Some functinalities may not available, since location is not available."
				);

			if (localStorage.getItem("user"))
				dispatch({
					type: "SET_USER",
					payload: JSON.parse(localStorage.getItem("user")),
				});

			const queryMessages = query(reportsRef);

			onSnapshot(queryMessages, snapshot => {
				snapshot.docChanges().forEach(async item => {
					const event = item.doc.data();

					if (
						!(
							item.type === "added" &&
							isRecent(
								new Date(event.geometry[0].date),
								Date.now()
							)
						)
					)
						return;

					const res = await fetch(
						`https://nominatim.openstreetmap.org/reverse?lat=${event.geometry[0].coordinates[1]}&lon=${event.geometry[0].coordinates[0]}&format=json`
					);
					const data = await res.json();

					toast.info(
						`${
							event.reportedBy.name.split(" ")[0]
						} reported a fire at ${
							data.address.city
						}, ${formatDateAgo(event.geometry[0].date)}`,
						{
							position: toast.POSITION.BOTTOM_RIGHT,
							theme: "dark",
							type: toast.TYPE.WARNING,
							style: {
								borderRadius: "15px",
								backgroundColor: "var(--clr-primary)",
							},
						}
					);
				});

				dispatch({
					type: "UPDATE_EVENTS",
					payload: {
						reportedEvents: snapshot.docs.map(doc => ({
							...doc.data(),
							id: doc.id,
						})),
					},
				});
			});
		}

		return () => {
			effectRan.current = true;
		};
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
			}}>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
