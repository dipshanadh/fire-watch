import { useGlobalContext } from "../../context";

const InfoModal = () => {
	const { currentEvent, closeInfoModal } = useGlobalContext();

	const { title, date, location, distance, link, coordinates } = currentEvent;

	return (
		<div className="info-modal">
			<button
				className="modal-close"
				onClick={() => closeInfoModal()}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="white"
					width="25px"
					height="25px"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
			<a
				className="modal-heading"
				href={link}
				target="_blank"
			>
				{title.length > 40 ? title.slice(0, 40) + "..." : title}
			</a>
			<div className="modal-body">
				<p>
					<span>Loctation:</span> {location}
				</p>
				<p>
					<span>Since:</span> {date}
				</p>
				<p>
					<span>Coordinates:</span> (
					{`${coordinates[0]}, ${coordinates[1]}`})
				</p>
				<p>
					<span>Distance:</span> {distance} KM
				</p>
			</div>
		</div>
	);
};

export default InfoModal;
