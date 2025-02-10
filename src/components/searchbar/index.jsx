import { useContext, useState } from "react";
import searchArrow from "../../assets/images/icon-arrow.svg";
import styles from "./searchbar.module.scss";
import { TrackerContext } from "../../context/TrackerContext";

const apiKey = import.meta.env.VITE_GEOLOCATION_API_KEY;

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const { dispatch } = useContext(TrackerContext);

  function handleSearchInputChange(event) {
    // console.log(event.target.value);
    setSearchInput(event.target.value);
  }

  async function handleSearchSubmit(e) {
    e.preventDefault();
    // console.log(searchInput);
    const url = `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${searchInput}`;
    // console.log(url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      if (data) {
        // console.log(data);
        dispatch({ type: "SET_OUTPUT", payload: data });
      }
    } catch (error) {
      console.log(error);
    }
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
