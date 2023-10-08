import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import MyMarker from "./Marker";

import { useGlobalContext } from "../../context";

const Foo = ({ centralCoordinates }) => {
	const map = useMap();

	useEffect(() => {
		map.setView(centralCoordinates);
		map.setZoom(6);
	}, [centralCoordinates]);

	return <></>;
};

const Map = () => {
	const { centralCoordinates, isLoading, events } = useGlobalContext();

	return (
		<MapContainer
			center={centralCoordinates}
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
			<Foo centralCoordinates={centralCoordinates} />
		</MapContainer>
	);
};

export default Map;
