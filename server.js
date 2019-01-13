require("./config/config");
require("./models/db");

//Dependencies
const express = require("express");
constbodyParser = require("body-parser");
const cors = require("cors");

const server = express();

//Middleware
server.use(bodyParser.json());
server.use(cors());

//Start Server
server.listen(process.env.PORT, () => {
  console.log(`Server started at port: ${process.env.PORT}`);
});
