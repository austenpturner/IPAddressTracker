import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../src/styles/styles.scss";
import TrackerProvider from "./context/TrackerContext.jsx";
import { APIProvider } from "@vis.gl/react-google-maps";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

createRoot(document.getElementById("root")).render(
  <APIProvider apiKey={apiKey}>
    <TrackerProvider>
      <App />
    </TrackerProvider>
  </APIProvider>
);
