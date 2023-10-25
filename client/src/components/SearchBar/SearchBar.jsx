import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  //useState para crear un estado local, search, que almacena el valor de búsqueda.
  const [search, setSearch] = useState("");
  //handleSearch se ejecuta cuando se produce un cambio en el search, toma el valor y lo almacena en el estado local
  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const handleClick = () => {
    //despacha la action.
    dispatch(getPokemonByName(search));
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search Pokemon"
        className={styles.input}
      ></input>
      <button onClick={handleClick} className={styles.button}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
