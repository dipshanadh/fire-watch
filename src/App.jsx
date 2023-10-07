import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";
import FilterOpt from "./components/FilterOpt";
import InfoModal from "./components/Modals/InfoModal";
import ReportModal from "./components/Modals/ReportModal";

import { useGlobalContext } from "./context";

const App = () => {
	const { isLoading, isInfoModalOpen, isReportModalOpen } =
		useGlobalContext();

	return isLoading ? (
		<Loader />
	) : (
		<>
			<Sidebar />
			<Map />
			<FilterOpt />
			{isInfoModalOpen && <InfoModal />}
			{isReportModalOpen && <ReportModal />}
		</>
	);
};

export default App;
