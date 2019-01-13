const mongoose = require("mongoose");

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
