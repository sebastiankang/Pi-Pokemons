import Card from "../Card/Card";
import { useSelector } from "react-redux";
import style from "../CardsContainer/CardsContainer.module.css";
import { useEffect, useState } from "react";
import Paginado from "../Paginado/Paginado";

const CardsContainer = () => {
  //hook para obtener los pokemones desde el estado global
  let allPokemons = useSelector((state) => state.pokemons);

  //logica del paginado?
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12); //12 por pagina

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const pokemons = allPokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //para configurar la página actual en 1 cada vez que cambia la lista de pokemones.
  useEffect(() => {
    paginado(1);
  }, [allPokemons]);

  return (
    <div>
      <div>
        {allPokemons.length ? <h1>POKEMONS</h1> : <h1>LOADING POKEMONS</h1>}
        <div className={style.container}>
          {pokemons.map((pokemon) => {
            return (
              <Card
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
              />
            );
          })}
        </div>
        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons?.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
};

export default CardsContainer;
