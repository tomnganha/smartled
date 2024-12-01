const Schedule = require("../models/schedule.model");
//[GET] /admin/schedule
module.exports.schedule = (req, res) => {
  res.render("schedule/index");
};
//[PATCH] /admin/schedule
module.exports.schedulePatch = async (req, res) => {
  console.log("this");
  console.log(req.body);
  try {
    await Schedule.updateOne({ title: "schedule" }, req.body);
    res.redirect("/");
  } catch (error) {
    console.log("error", error);
    res.redirect("back");
  }
  //res.redirect("back");
};
