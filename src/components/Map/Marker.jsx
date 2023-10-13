import { Icon } from "leaflet";
import { Marker } from "react-leaflet";

import isRecent from "../../utils/isRecent";

import { useGlobalContext } from "../../context";

const MyMarker = ({ event }) => {
	const { updateEvent } = useGlobalContext();

	const icon = new Icon({
		iconUrl: isRecent(new Date(event.geometry[0].date), Date.now)
			? "green-fire.png"
			: "fire.png",
		iconSize: [32, 32],
	});

	return (
		<Marker
			key={event.id}
			position={[
				event.geometry[0].coordinates[1],
				event.geometry[0].coordinates[0],
			]}
			icon={icon}
			eventHandlers={{
				click: () => updateEvent(event.id),
			}}
		/>
	);
};

export default MyMarker;
