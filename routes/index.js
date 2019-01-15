const express = require("express");
const router = express.Router();

const user = require("../controllers/users");
const jwtHelper = require("../config/jwtHelper");

router.post("/signup", user.signUp);
router.post("/login", user.logIn);

router.get("/userProfile", jwtHelper.verifyJwtToken, user.userProfile);

module.exports = router;
