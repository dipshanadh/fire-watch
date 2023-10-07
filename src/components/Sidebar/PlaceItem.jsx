const PlaceItem = ({ name, code }) => {
	return (
		<div className="place-item">
			<img
				src={`https://flagcdn.com/16x12/${code}.png`}
				alt={name}
				style={{ marginRight: "8px" }}
			/>
			{name}
		</div>
	);
};

export default PlaceItem;
