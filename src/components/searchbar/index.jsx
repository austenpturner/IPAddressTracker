import { useContext, useState } from "react";
import searchArrow from "../../assets/images/icon-arrow.svg";
import styles from "./searchbar.module.scss";
import { TrackerContext } from "../../context/TrackerContext";
import { useFetchIPData } from "../../hooks/useFetchIPData";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const { state, dispatch } = useContext(TrackerContext);

  // Use the custom hook to fetch IP data
  useFetchIPData(state.input, dispatch);

  function handleSearchInputChange(event) {
    setSearchInput(event.target.value);
  }

  async function handleSearchSubmit(e) {
    e.preventDefault();
    dispatch({ type: "SET_INPUT", payload: searchInput });
  }

  return (
    <div className={styles.searchbarContainer}>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="searchInput"
          id="searchInput"
          value={searchInput}
          placeholder="Search for any IP address or domain"
          onChange={handleSearchInputChange}
        />
        <button type="submit">
          <img src={searchArrow} alt="search" />
        </button>
      </form>
    </div>
  );
}
