const { Router } = require("express");
const {
  getPokemons,
  postPokemons,
  getPokemonsById,
} = require("../handlers/pokemonHandler");
const pokemonRouter = Router();

//rutas
pokemonRouter.get("/", getPokemons);

pokemonRouter.post("/", postPokemons);

pokemonRouter.get("/:id", getPokemonsById);

module.exports = pokemonRouter;
