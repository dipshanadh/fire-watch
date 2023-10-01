import PlaceList from "./PlacesList";
import ReportFire from "./ReportFire";

const Sidebar = () => {
	return (
		<div className="sidebar">
			<h1 className="sidebar-heading">FireWatch</h1>
			<PlaceList />
			<ReportFire />
		</div>
	);
};

export default Sidebar;
