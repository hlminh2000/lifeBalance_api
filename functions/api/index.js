const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const graphqlExpress = require("graphql-server-express").graphqlExpress;
const graphiqlExpress = require("graphql-server-express").graphiqlExpress;
const schema = require("./schema.js");
const makeExecutableSchema = require("graphql-tools");
const printSchema = require("graphql/utilities/schemaPrinter");
const cors = require("cors");


app.get("/", (req, res, next) => {
  res.send("API!!!!");
});

// /api/graphql
app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  (req, res, next) => {
    console.log("===========================")
    console.log("query: \n", req.body.query)
    console.log("variables: \n", req.body.variables)
    console.log("===========================")
    next()
  },
  graphqlExpress({ schema, context: {} })
);

// /api/graphiql
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// /api/schema
app.use("/schema", (req, res) => {
  res.set("Content-Type", "text/plain");
  res.send(printSchema(schema));
});

module.exports = app;
