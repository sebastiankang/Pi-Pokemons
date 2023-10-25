import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPokemonById(id));
  }, [dispatch, id]);

  const pokemon = useSelector((state) => state.pokemonId);
  return (
    pokemon && (
      <div className={styles.detailContainer}>
        <h4>Id: {pokemon.id}</h4>
        <p>Name:{pokemon?.name}</p>
        <img src={pokemon.image} alt={`${pokemon.name}`} />
        <p>Life:{pokemon.life}</p>
        <p>Attack:{pokemon.attack}</p>
        <p>Defense:{pokemon.defense}</p>
        <p>Speed:{pokemon.speed}</p>
        <p>Height:{pokemon.height}</p>
        <p>Weight:{pokemon.weight}</p>
        <div className={`${styles.types} types`}>
          <p>Type/s:</p>
          {pokemon.types?.map((t) => (
            <p key={t.name}>{t.name}</p>
          ))}
        </div>
      </div>
    )
  );
};

export default Detail;
