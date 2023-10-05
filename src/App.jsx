import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import Loader from "./components/Loader";

import { useGlobalContext } from "./context";

const App = () => {
	const { isModalOpen, isLoading } = useGlobalContext();

	return isLoading ? (
		<Loader />
	) : (
		<>
			<Sidebar />
			<Map />
			{isModalOpen && <Modal />}
		</>
	);
};

export default App;
