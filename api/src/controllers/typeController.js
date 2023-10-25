const axios = require("axios");
const { Type } = require("../db");

const getTypesController = async () => {
  const types = Type.findAll();
  return types;
};

const getTypesLoaded = async () => {
  const types = await axios.get("https://pokeapi.co/api/v2/type");
  const arrayTypes = types.data.results.map((t) => {
    return { name: t.name };
  });
  const typesLoaded = await Type.bulkCreate(arrayTypes); //bulkcreste() inserta arrayTypes en la db
  return typesLoaded;
};

module.exports = { getTypesController, getTypesLoaded };
