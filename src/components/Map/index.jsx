import { MapContainer, TileLayer } from "react-leaflet";

import MyMarker from "./Marker";

import { useGlobalContext } from "../../context";

const Map = () => {
	const { isLoading, events } = useGlobalContext();

	const position = [27.7172, 85.324];

	return (
		<MapContainer
			center={position}
			zoom={5}
			scrollWheelZoom={false}
			className="map"
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			{!isLoading &&
				events.map(event => (
					<MyMarker
						key={event.id}
						event={event}
					/>
				))}
		</MapContainer>
	);
};

export default Map;
