import { Icon } from "leaflet";
import { Marker } from "react-leaflet";

const MyMarker = ({ event }) => {
	const icon = new Icon({
		iconUrl: "fire.png",
		iconSize: [32, 32],
	});

	return (
		<Marker
			key={event.id}
			position={event.geometry[0].coordinates.reverse()}
			icon={icon}
		></Marker>
	);
};

export default MyMarker;
