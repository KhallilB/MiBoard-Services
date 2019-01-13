const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useCreateIndex: true },
  err => {
    if (!err) {
      console.log("Connected To MonogoDB Sucessfully.");
    } else {
      console.log(
        "Error in MongoDB connection: " + JSON.stringify(err, undefined, 2)
      );
    }
  }
);
