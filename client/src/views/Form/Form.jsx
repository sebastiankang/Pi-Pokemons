import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postPokemons } from "../../redux/actions";
import formValidation from "./formValidation";
import styles from "./Form.module.css";

const Form = () => {
  //almacena la info ingresada en los inputs
  const [form, setForm] = useState({
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: "",
  });

  const changeHandler = (event) => {
    //logica de almacenamiento en el estado
    const property = event.target.name;
    const value = event.target.value;

    switch (property) {
      case "types":
        const typeVerificated = form.types.filter((t) => t === value);
        const typesSelected = allTypes.filter((t) => t.name === value);
        if (typeVerificated.length) {
          return;
        } else {
          setForm((prevState) => {
            const newForm = {
              ...prevState,
              types: [...prevState.types, typesSelected[0]],
            };
            return newForm;
          });
        }

        break;

      default:
        setForm({ ...form, [property]: value });
        break;
    }
  };

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    const validationErrors = formValidation(form);
    // Verifica si hay errores de validación
    if (Object.keys(validationErrors).length === 0) {
      // Si no hay errores envia el formulario
      dispatch(postPokemons(form));
      alert("Pokemon created successfully");
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const allTypes = useSelector((state) => state.types);

  return (
    <form className={styles.formContainer} onSubmit={submitHandler}>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={form.name}
          onChange={changeHandler}
          name="name"
          autoComplete="off"
          className={styles.inputField}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>
      <div>
        <label>Image: </label>
        <input
          type="text"
          value={form.image}
          onChange={changeHandler}
          name="image"
          placeholder="url of the image"
          autoComplete="off"
          className={styles.inputField}
        />
        {errors.image && <p className={styles.error}>{errors.image}</p>}
      </div>
      <div>
        <label>Life: </label>
        <input
          type="number"
          value={form.life}
          onChange={changeHandler}
          name="life"
          autoComplete="off"
          className={styles.inputField}
        />
        {errors.life && <p className={styles.error}>{errors.life}</p>}
      </div>
      <div>
        <label>Attack: </label>
        <input
          type="number"
          value={form.attack}
          onChange={changeHandler}
          name="attack"
          autoComplete="off"
          className={styles.inputField}
        />
        {errors.attack && <p className={styles.error}>{errors.attack}</p>}
      </div>
      <div>
        <label>Defense: </label>
        <input
          type="number"
          value={form.defense}
          onChange={changeHandler}
          name="defense"
          autoComplete="off"
          className={styles.inputField}
        />
        {errors.defense && <p className={styles.error}>{errors.defense}</p>}
      </div>
      <div>
        <label>Speed: </label>
        <input
          type="number"
          value={form.speed}
          onChange={changeHandler}
          name="speed"
          autoComplete="off"
          className={styles.inputField}
        />
      </div>
      <div>
        <label>Height: </label>
        <input
          type="number"
          value={form.height}
          onChange={changeHandler}
          name="height"
          autoComplete="off"
          className={styles.inputField}
        />
      </div>
      <div>
        <label>Weight: </label>
        <input
          type="number"
          value={form.weight}
          onChange={changeHandler}
          name="weight"
          autoComplete="off"
          className={styles.inputField}
        />
      </div>
      <div>
        <label>Types: </label>
        <select onChange={changeHandler} name="types">
          {allTypes?.map((t) => (
            <option key={t.name} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
        <p>{form.types.map((t) => t.name + ", ")}</p>
      </div>
      <button type="submit">CREATE POKEMON</button>
    </form>
  );
};

export default Form;
