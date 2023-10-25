const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getPokemonsController = async () => {
  const pokemonApi = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=50"
  );

  const pokemonApiData = await Promise.all(
    pokemonApi.data.results.map(async (pokemon) => {
      const pokemonData = await axios.get(pokemon.url);
      return {
        id: pokemonData.data.id,
        name: pokemonData.data.name,
        image: pokemonData.data.sprites.other.dream_world.front_default,
        life: pokemonData.data.stats[0].base_stat,
        attack: pokemonData.data.stats[1].base_stat,
        defense: pokemonData.data.stats[2].base_stat,
        speed: pokemonData.data.stats[5].base_stat,
        height: pokemonData.data.height,
        weight: pokemonData.data.weight,
        types: pokemonData.data.types.map((type) => {
          return { name: type.type.name };
        }),
      };
    })
  );

  const pokemonDb = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const allPokemons = [...pokemonDb, ...pokemonApiData];

  return allPokemons;
};
const postPokemonsController = async (
  name,
  image,
  life,
  attack,
  defense,
  speed,
  height,
  weight,
  types
) => {
  //para que se guarden en minusculas y simplifique la busqueda
  let nameMinuscula = name.toLowerCase();

  // para que se cree un nuevo pokemon en la base de datos
  const newPokemon = await Pokemon.create({
    name: nameMinuscula,
    image: image,
    life: life,
    attack: attack,
    defense: defense,
    speed: speed,
    height: height,
    weight: weight,
  });
  //para establecer una relación entre un newPokemon y uno o varios types en la db
  const arrayTypes = types.map((t) => t.id);
  newPokemon.addType(arrayTypes);
  return newPokemon;
};

const getPokemonsByIdController = async (id) => {
  //comparacion de id y ver donde hacer la peticion, isNaN(its not a number)
  if (isNaN(id)) {
    //get a la base de datos
    const pokemonDb = await Pokemon.findAll({
      where: {
        id: id,
      },
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    return pokemonDb[0];
  } else {
    //get a la API
    const pokemonApi = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    return {
      id: pokemonApi.data.id,
      name: pokemonApi.data.name,
      image: pokemonApi.data.sprites.other.dream_world.front_default,
      life: pokemonApi.data.stats[0].base_stat,
      attack: pokemonApi.data.stats[1].base_stat,
      defense: pokemonApi.data.stats[2].base_stat,
      speed: pokemonApi.data.stats[5].base_stat,
      height: pokemonApi.data.height,
      weight: pokemonApi.data.weight,
      types: pokemonApi.data.types.map((type) => {
        return { name: type.type.name };
      }),
    };
  }
};
const getPokemonsByNameController = async (name) => {
  name = name.toLowerCase();

  const pokemonDb = await Pokemon.findAll({
    where: { name: name },
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  if (pokemonDb.length > 0) {
    return pokemonDb;
  } else {
    const pokemonApi = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );

    const pokemonApiData = {
      id: pokemonApi.data.id,
      name: pokemonApi.data.name,
      image: pokemonApi.data.sprites.other.dream_world.front_default,
      life: pokemonApi.data.stats[0].base_stat,
      attack: pokemonApi.data.stats[1].base_stat,
      defense: pokemonApi.data.stats[2].base_stat,
      speed: pokemonApi.data.stats[5].base_stat,
      height: pokemonApi.data.height,
      weight: pokemonApi.data.weight,
      types: pokemonApi.data.types.map((type) => {
        return { name: type.type.name };
      }),
    };

    return [pokemonApiData]; //[] para que esten con el mismo formato, array de objetos
  }
};

module.exports = {
  getPokemonsController,
  postPokemonsController,
  getPokemonsByIdController,
  getPokemonsByNameController,
};
