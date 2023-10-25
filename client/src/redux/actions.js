import axios from "axios";
//action.types
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMONS_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const POST_POKEMONS = "POST_POKEMONS";
export const FILTER = "FILTER";
export const ORDER_POKEMONS_ALF = "ORDER_POKEMONS_ALF";

export const getPokemons = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/pokemon");
    const pokemons = response.data;
    dispatch({ type: GET_POKEMONS, payload: pokemons });
  };
};

export const getPokemonById = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/pokemon/${id}`);
    const pokemonId = response.data;
    dispatch({ type: GET_POKEMON_BY_ID, payload: pokemonId });
  };
};

export const getPokemonByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/pokemon?name=${name}`
      );
      const pokemonName = response.data;
      dispatch({ type: GET_POKEMON_BY_NAME, payload: pokemonName });
    } catch (error) {
      alert("This pokemon doesn't exist");
    }
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/types");
    const types = response.data;
    dispatch({ type: GET_TYPES, payload: types });
  };
};

export const postPokemons = (body) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/pokemon", body);
      alert("Pokemon created succesfully");
      return dispatch({ type: POST_POKEMONS, payload: response.data });
    } catch (error) {
      alert("Something went wrong");
    }
  };
};

export function orderPokemonsAlf(payload) {
  return {
    type: ORDER_POKEMONS_ALF,
    payload,
  };
}
export const filter = (create) => {
  return { type: FILTER, payload: create };
};
