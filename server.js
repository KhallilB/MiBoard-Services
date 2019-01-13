require("./config/config");
require("./models/db");
require("./config/passportConfig");

const rtsIndex = require("./routes/index");

//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const server = express();

//Middleware
server.use(bodyParser.json());
server.use(cors());
server.use(passport.initialize());
server.use("/api", rtsIndex);

//Start Server
server.listen(process.env.PORT, () => {
  console.log(`Server started at port: ${process.env.PORT}`);
});
