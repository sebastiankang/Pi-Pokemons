const {
  getTypesController,
  getTypesLoaded,
} = require("../controllers/typeController");

const getTypes = async (req, res) => {
  try {
    const types = await getTypesController();
    if (types.length) {
      res.status(200).send(types);
    } else {
      const newTypes = await getTypesLoaded();
      res.status(200).send(newTypes);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { getTypes };
