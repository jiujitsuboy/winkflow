const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require ("./graphql/schema");
const graphqlResolver = require ("./graphql/resolvers")
const authMiddleware = require ("./middleware/auth")

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

server.use(
    "/graphql",
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: graphqlResolver,
      graphiql: true,
      customFormatErrorFn(err) {
        if (!err.originalError) {
          return err;
        }
        const data = err.originalError.data;
        const message = err.message || "An error occurred.";
        const code = err.originalError.code || 500;
        return { message, status: code, data };
      },
    })
  );


server.get("/info", (req, res) => {
    res.json({message: "API for winkflow...", version: process.env.npm_package_version});
  });

server.listen(4000, () => {
    console.log("express server up....");
  });