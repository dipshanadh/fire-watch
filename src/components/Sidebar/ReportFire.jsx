import { useGlobalContext } from "../../context";

const ReportFire = () => {
	const { openReportModal } = useGlobalContext();

	return (
		<button
			className="report"
			onClick={() => openReportModal()}
		>
			Report{" "}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={2}
				stroke="currentColor"
				width="20px"
				height="20px"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 4.5v15m7.5-7.5h-15"
				/>
			</svg>
		</button>
	);
};

export default ReportFire;
