const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const passport = require("passport");

const User = require("../models/User");

//Saves user to database and gives token
module.exports.signUp = (req, res) => {
  const user = new User();
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.password = req.body.password;
  console.log(user);
  user.save((err, user) => {
    if (!err) {
      let payload = { subject: user._id };
      let token = jwt.sign(payload, "secret");
      res.status(200).send({ token: token });
    } else {
      console.log(err);
      if (err.code == 400) {
        res.status(422).send(["Duplicate Email found."]);
      } else {
        return err;
      }
    }
  });
};

module.exports.logIn = (req, res) => {
  // Calls passport authentication
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(404).json(err);
    console.log(err);
    if (user) {
      console.log("user:", user);
      let payload = { subject: user._id };
      let token = jwt.sign(payload, "secret");
      res.status(200).send({ token: token });
    } else return res.status(401).json(info);
  })(req, res);
};

//Sends saved user information as JSON object
module.exports.userProfile = (req, res) => {
  User.findOne({ _id: req._id }),
    (err, user) => {
      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: "User Record Not Found." });
      } else {
        return res
          .status(200)
          .json({ status: true, user: _.pick(user, ["fullName", "email"]) });
      }
    };
};
