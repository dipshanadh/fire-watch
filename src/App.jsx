import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import Recent from "./components/Recent";
import InfoModal from "./components/Modals/InfoModal";
import ReportModal from "./components/Modals/ReportModal";

import { useGlobalContext } from "./context";
const App = () => {
	const { isInfoModalOpen, isReportModalOpen } = useGlobalContext();

	return (
		<>
			<Sidebar />
			<Map />
			<Recent />
			{isInfoModalOpen && <InfoModal />}
			{isReportModalOpen && <ReportModal />}
		</>
	);
};

export default App;
