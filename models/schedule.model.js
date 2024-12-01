const mongoose = require("mongoose");
const schedule = new mongoose.Schema({
  onTime: String,
  offTime: String,
});

const Schedule = mongoose.model("Schedule", schedule, "schedule");
module.exports = Schedule;
