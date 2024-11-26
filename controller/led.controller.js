const Led = require("../models/led.model");

module.exports.changeStatus = async (req, res) => {
  console.log(req.params);
  const status = req.params.status;
  const id = req.params.id;

  await Led.updateOne({ _id: id }, { status: status });
  res.redirect("back");
};
