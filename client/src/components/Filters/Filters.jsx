import { useDispatch, useSelector } from "react-redux";
import { filter, getTypes, orderPokemonsAlf } from "../../redux/actions";
import { useEffect, useState } from "react";
import styles from "./Filters.module.css";

const Filters = () => {
  // useSelector para obtener todos los types y pokemones del estado
  let allTypes = useSelector((state) => state.types);
  const [values, setValues] = useState({
    origin: "All",
    type: "All",
  });
  const dispatch = useDispatch();

  // Cargar los tipos de Pokémon al renderizar la página de inicio
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleOrderChange = (event) => {
    const selectedOrder = event.target.value;
    dispatch(orderPokemonsAlf(selectedOrder)); // Despacha la acción para ordenar los pokemones por orden alfabetico
  };

  const filterHandler = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    switch (key) {
      case "origin":
        dispatch(filter({ ...values, origin: value }));
        setValues({ ...values, origin: value });
        break;

      case "type":
        dispatch(filter({ ...values, type: value }));
        setValues({ ...values, type: value });
        break;
      default:
    }
  };

  return (
    <div className={styles.filterContainer}>
      <select
        className={styles.selectFilter}
        name="type"
        onClick={filterHandler}
      >
        <option key="All" value="All">
          All Type
        </option>
        {allTypes.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
      <select
        className={styles.selectFilter}
        name="order"
        onChange={handleOrderChange}
      >
        <option value="asc">Order A-Z</option>
        <option value="desc">Order Z-A</option>
        <option value="attack-asc">Attack Ascendent</option>
        <option value="attack-desc">Attack Descendent</option>
      </select>
      <select
        className={styles.selectFilter}
        name="origin"
        onChange={filterHandler}
      >
        <option value="All">All</option>
        <option value="Creado">Creado</option>
        <option value="Api">Api</option>
      </select>
    </div>
  );
};

export default Filters;
