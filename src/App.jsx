import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";

import { useGlobalContext } from "./context";
const App = () => {
	const { isModalOpen } = useGlobalContext();

	return (
		<>
			<Sidebar />
			<Map />
			{isModalOpen && <Modal />}
		</>
	);
};

export default App;
