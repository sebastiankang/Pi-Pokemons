const { Router } = require("express");
const { getTypes } = require("../handlers/typeHandler");

const typeRouter = Router();

typeRouter.get("/", getTypes);

module.exports = typeRouter;
