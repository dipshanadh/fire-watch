import PlaceList from "./PlacesList";
import ReportFire from "./ReportFire";

const Sidebar = () => {
	return (
		<div className="sidebar">
			<h1 className="sidebar-heading">FireWatch</h1>
			<div className="country">COUNTRIES</div>
			<PlaceList />
			<ReportFire />
			<p className="copy">©Copyright 2023 • FireWatch</p>
		</div>
	);
};

export default Sidebar;
