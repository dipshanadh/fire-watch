import React from "react";
import ReactDOM from "react-dom/client";

import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import "./index.css";

import App from "./App.jsx";
import { AppProvider } from "./context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AppProvider>
			<App />
		</AppProvider>
	</React.StrictMode>
);
