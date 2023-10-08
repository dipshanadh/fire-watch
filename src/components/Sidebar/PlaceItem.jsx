import { useGlobalContext } from "../../context";

const PlaceItem = ({ name, code, coordinates }) => {
	const { setCentralCoordinates } = useGlobalContext();

	return (
		<button
			className="place-item"
			onClick={() => setCentralCoordinates(coordinates)}
		>
			<img
				src={`https://flagcdn.com/16x12/${code}.png`}
				alt={name}
				style={{ marginRight: "8px" }}
			/>
			{name}
		</button>
	);
};

export default PlaceItem;
