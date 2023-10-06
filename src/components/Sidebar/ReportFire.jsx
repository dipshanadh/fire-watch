import { useGlobalContext } from "../../context";

const ReportFire = () => {
	const { openReportModal } = useGlobalContext();

	return (
		<button className="report" onClick={() => openReportModal()}>
			Report +
		</button>
	);
};

export default ReportFire;
