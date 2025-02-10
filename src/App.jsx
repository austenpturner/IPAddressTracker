import Header from "./components/header";
import MapContainer from "./components/map";
import ResultsContainer from "./components/results";

function App() {
  return (
    <div style={{ position: "relative" }}>
      <Header />
      <ResultsContainer />
      <MapContainer />
    </div>
  );
}

export default App;
