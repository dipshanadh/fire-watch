import PlaceItem from "./PlaceItem";

const PlaceList = () => {
	const wildfireCountries = [
		{ name: "United States", code: "us" },
		{ name: "Canada", code: "ca" },
		{ name: "Australia", code: "au" },
		{ name: "Brazil", code: "br" },
		{ name: "Russia", code: "ru" },
		{ name: "South Africa", code: "za" },
	];

	return (
		<div className="place-list">
			{wildfireCountries.map(country => (
				<PlaceItem
					key={country.code}
					name={country.name}
					code={country.code}
				/>
			))}
		</div>
	);
};

export default PlaceList;
