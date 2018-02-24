const query = require("./query/index.js");
const mutation = require("./mutation/index.js");
const users = [{ name: "John" }];

const resolveFunctions = {
  Query: query,
  Mutation: mutation
};

module.exports = resolveFunctions;
