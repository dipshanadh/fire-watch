import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
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
			<Marker position={position}>
				<Popup>A sample marker on the map.</Popup>
			</Marker>
		</MapContainer>
	);
};

export default Map;
