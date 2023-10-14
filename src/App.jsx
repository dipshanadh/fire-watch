import { ToastContainer } from "react-toastify";

import Map from "./components/Map";
import Sidebar from "./components/Sidebar";

import InfoModal from "./components/Modals/InfoModal";
import ReportModal from "./components/Modals/ReportModal";

import Auth from "./components/others/Auth";
import FilterOpt from "./components/others/FilterOpt";
import Loader from "./components/others/Loader";

import { useGlobalContext } from "./context";

const App = () => {
	const { isLoading, isInfoModalOpen, isReportModalOpen } =
		useGlobalContext();

	return (
		<>
			{isLoading && <Loader />}
			<Sidebar />
			<Map />
			<FilterOpt />
			<Auth />
			{isInfoModalOpen && <InfoModal />}
			{isReportModalOpen && <ReportModal />}
			<ToastContainer />
		</>
	);
};

export default App;
