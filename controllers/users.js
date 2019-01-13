const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const User = require("../models/User");

module.exports.signUp = (req, res) => {
  var user = new User();
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      if (err.code == 11000) {
        res.statust(422).send(["Duplicate Email found."]);
      } else {
        return err;
      }
    }
  });
};

module.exports.authenticate = (req, res) => {
  // Calls passport authentication
  passport.authenticate("local", (err, user, info) => {
    //error from passport middleware
    if (err) return res.status(404).json(err);
    //registered user
    if (user) return res.status(200).json({ token: user.genrateJwt() });
    //unknown user or wrong psasword
    else return res.status(401).json(info);
  });
};

userSchema.methods.genrateJwt = function() {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXP
    }
  );
};

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
