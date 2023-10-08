import PlaceItem from "./PlaceItem";

const PlaceList = () => {
	const wildfireCountries = [
		{
			name: "United States",
			code: "us",
			coordinates: [37.0902, -95.7129],
		},
		{
			name: "Canada",
			code: "ca",
			coordinates: [56.1304, -106.3468],
		},
		{
			name: "Australia",
			code: "au",
			coordinates: [-25.2744, 133.7751],
		},
		{
			name: "Brazil",
			code: "br",
			coordinates: [-14.235, -51.9253],
		},
		{
			name: "Spain",
			code: "es",
			coordinates: [40.4168, -3.7038],
		},
		{
			name: "South Africa",
			code: "za",
			coordinates: [-30.5595, 22.9375],
		},
	];

	return (
		<div className="place-list">
			{wildfireCountries.map(country => (
				<PlaceItem
					key={country.code}
					name={country.name}
					code={country.code}
					coordinates={country.coordinates}
				/>
			))}
		</div>
	);
};

export default PlaceList;
