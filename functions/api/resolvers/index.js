const query = require("./query/index.js");
const mutation = require("./mutation/index.js");
const types = require("./types/index.js");

const resolveFunctions = Object.assign(
  {
    Query: query,
    Mutation: mutation
  },
  types
);

module.exports = resolveFunctions;
