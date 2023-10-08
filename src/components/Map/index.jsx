import { MapContainer, TileLayer } from "react-leaflet";

import MyMarker from "./Marker";

import { useGlobalContext } from "../../context";

const Map = () => {
	const { isLoading, events } = useGlobalContext();

	return (
		<MapContainer
			center={[40.758701, -111.876183]}
			zoom={5}
			scrollWheelZoom={true}
			className="map"
			maxZoom={7}
			minZoom={4}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			{!isLoading &&
				events.map((event) => (
					<MyMarker
						key={event.id}
						event={event}
					/>
				))}
		</MapContainer>
	);
};

export default Map;
