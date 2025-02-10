import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../src/styles/styles.scss";
import TrackerProvider from "./context/TrackerContext.jsx";

createRoot(document.getElementById("root")).render(
  <TrackerProvider>
    <App />
  </TrackerProvider>
);
