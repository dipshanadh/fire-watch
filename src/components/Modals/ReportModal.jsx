import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useGlobalContext } from "../../context";

import { db } from "../../config";

const ReportModal = () => {
	const { closeReportModal } = useGlobalContext();

	const [city, setCity] = useState("");

	const handleSubmit = async e => {
		e.preventDefault();

		const res = await fetch(
			`https://nominatim.openstreetmap.org/search?format=json&city=${city}&email=dipshanadh`
		);
		const data = await res.json();

		if (!data) {
			alert("Could not find the city.");
			location.reload();
		}

		await addDoc(collection(db, "reports"), {
			title: `Fire in ${city} [Reported]`,
			geometry: [
				{
					coordinates: [data[0].lon, data[0].lat],
					date: Date.now(),
				},
			],
		});

		location.reload();
	};

	return (
		<div
			className="report-modal-overlay"
			onClick={() => closeReportModal()}>
			<form
				className="report-modal-container"
				onClick={e => e.stopPropagation()}
				onSubmit={e => handleSubmit(e)}>
				<button
					className="modal-close"
					type="button"
					onClick={() => closeReportModal()}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="white"
						width="25px"
						height="25px">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
				<div className="report-top">
					<h2 className="report-header">Report</h2>
					<div className="report-line"></div>
					<p className="report-text">
						Enter the name of a place you want to report
					</p>
				</div>
				<input
					className="report-bottom"
					placeholder="City name"
					name="city"
					value={city}
					onChange={e => setCity(e.target.value)}
					autoFocus
				/>
			</form>
		</div>
	);
};

export default ReportModal;
