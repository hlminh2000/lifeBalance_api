const express = require("express");
app = express();
bodyParser = require("body-parser");
graphqlExpress = require("graphql-server-express").graphqlExpress;
graphiqlExpress = require("graphql-server-express").graphiqlExpress;
schema = require("./schema.js");
makeExecutableSchema = require("graphql-tools");
printSchema = require("graphql/utilities/schemaPrinter");

app.get("/", (req, res, next) => {
  res.send("API!!!!");
});

// /api/graphql
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema, context: {} }));

// /api/graphiql
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// /api/schema
app.use("/schema", (req, res) => {
  res.set("Content-Type", "text/plain");
  res.send(printSchema(schema));
});

module.exports = app;
