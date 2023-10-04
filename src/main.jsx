import React from "react";
import ReactDOM from "react-dom/client";
import "leaflet/dist/leaflet.css";

import App from "./App.jsx";
import "./index.css";

import { AppProvider } from "./context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AppProvider>
			<App />
		</AppProvider>
	</React.StrictMode>
);
