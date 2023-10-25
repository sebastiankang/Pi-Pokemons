const {
  getPokemonsController,
  postPokemonsController,
  getPokemonsByIdController,
  getPokemonsByNameController,
} = require("../controllers/pokemonController");

const getPokemons = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const pokemonName = await getPokemonsByNameController(name);
      res.status(200).send(pokemonName);
    } else {
      const pokemons = await getPokemonsController();
      res.status(200).send(pokemons);
    }
  } catch (error) {
    res.status(400).send("No hay coincidencias");
  }
};

const postPokemons = async (req, res) => {
  const { name, image, life, attack, defense, speed, height, weight, types } =
    req.body;
  try {
    const newPokemon = await postPokemonsController(
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      types
    );
    res.status(200).send(newPokemon);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getPokemonsById = async (req, res) => {
  const { id } = req.params;
  try {
    const pokemonId = await getPokemonsByIdController(id);
    res.status(200).send(pokemonId);
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = { getPokemons, postPokemons, getPokemonsById };
