import {
  FILTER,
  GET_POKEMONS,
  GET_POKEMON_BY_ID,
  GET_POKEMON_BY_NAME,
  GET_TYPES,
  ORDER_POKEMONS_ALF,
} from "./actions";

const initialState = {
  pokemons: [],
  pokemonId: [],
  types: [],
  allPokemons: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case GET_POKEMON_BY_ID:
      return { ...state, pokemonId: action.payload };
    case GET_POKEMON_BY_NAME:
      return { ...state, pokemons: [...action.payload] };
    case GET_TYPES:
      return { ...state, types: action.payload };

    case ORDER_POKEMONS_ALF: //Ordenar los pokemones de A-Z y Z-A
      const sortedArr = [...state.pokemons]; // Copia el array de pokemones
      if (action.payload === "asc" || action.payload === "desc") {
        sortedArr.sort(function (a, b) {
          if (a.name > b.name) {
            return action.payload === "asc" ? 1 : -1;
          }
          if (b.name > a.name) {
            return action.payload === "asc" ? -1 : 1;
          }
          return 0;
        });
      } else if (
        action.payload === "attack-asc" ||
        action.payload === "attack-desc"
      ) {
        sortedArr.sort(function (a, b) {
          if (a.attack > b.attack) {
            return action.payload === "attack-asc" ? 1 : -1;
          }
          if (b.attack > a.attack) {
            return action.payload === "attack-asc" ? -1 : 1;
          }
          return 0;
        });
      }

      return {
        ...state,
        pokemons: sortedArr, // Actualiza el estado con el array ordenado
      };
    case FILTER:
      let filteredPokemons = [];
      if (action.payload.origin === "All") {
        // Si selecciona "All", muestra todos los Pokémon sin filtrar.
        filteredPokemons = state.allPokemons;
      } else if (action.payload.origin === "Creado") {
        // Filtra los Pokémon creados en la base de datos.
        filteredPokemons = state.allPokemons.filter(
          (pokemon) => pokemon.createdInDb
        );
      } else if (action.payload.origin === "Api") {
        // Filtra los Pokémon de la API (no creados en la base de datos).
        filteredPokemons = state.allPokemons.filter(
          (pokemon) => !pokemon.createdInDb
        );
      }

      if (action.payload.type !== "All") {
        filteredPokemons = filteredPokemons.filter((pokemon) => {
          return pokemon.types?.some((t) => t.name === action.payload.type);
        });
      }

      return {
        ...state,
        pokemons: filteredPokemons,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
