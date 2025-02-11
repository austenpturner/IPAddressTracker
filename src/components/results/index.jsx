import { useContext } from "react";
import ResultCard from "../card";
import styles from "./results.module.scss";
import { TrackerContext } from "../../context/TrackerContext";
import MapWrapper from "../map";

export default function ResultsContainer() {
  const { state } = useContext(TrackerContext);

  if (!state.output || state?.output?.results?.length === 0)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.resultsContainer}>
        {state?.output?.results?.map((result) => {
          return (
            <ResultCard
              type={result.name}
              result={result.result}
              key={result.id}
            />
          );
        })}
      </div>
      <div className={styles.mapContainer}>
        <MapWrapper />
      </div>
    </div>
  );
}
