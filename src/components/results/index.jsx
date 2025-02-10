import { useContext } from "react";
import ResultCard from "../card";
import styles from "./results.module.scss";
import { TrackerContext } from "../../context/TrackerContext";

export default function ResultsContainer() {
  const { state } = useContext(TrackerContext);

  if (state?.output?.results?.length === 0)
    return (
      <div className={styles.container}>
        <p>Loading...</p>
      </div>
    );

  return (
    <div className={styles.container}>
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
  );
}
