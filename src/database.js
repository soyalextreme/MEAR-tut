const mongoose = require("mongoose");

const URI = "mongodb://localhost/mern-tasks";

mongoose
  .connect(URI)
  .then((db) => console.log("Data base connected"))
  .catch((err) => console.error(err));

module.exports = mongoose;
