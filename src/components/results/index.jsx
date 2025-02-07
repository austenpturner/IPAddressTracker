import ResultCard from "../card";
import styles from "./results.module.scss";

const outputTypes = ["IP Address", "Location", "Timezone", "ISP"];

export default function ResultsContainer() {
  return (
    <div className={styles.container}>
      {outputTypes.map((type) => {
        return <ResultCard type={type} result="result" key={type} />;
      })}
    </div>
  );
}
