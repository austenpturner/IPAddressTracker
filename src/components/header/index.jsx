import styles from "./header.module.scss";
import SearchBar from "../searchbar";

export default function Header() {
  return (
    <div className={styles.header}>
      <h1>IP Address Tracker</h1>
      <SearchBar />
    </div>
  );
}
