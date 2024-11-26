const mongoose = require("mongoose");
const ledSchema = new mongoose.Schema({
  title: String,
  status: String,
  brightness: Number,
});

const Led = mongoose.model("Led", ledSchema, "led");
module.exports = Led;
