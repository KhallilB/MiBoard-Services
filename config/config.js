//Check ENV
const env = process.env.NODE_ENV || "development";

//FETCH ENV CONFIG
var config = require("./config.json");
var envConfig = config[env];

//Add env config values to process.env
Object.keys(envConfig).forEach(key => (process.env[key] = envConfig[key]));
