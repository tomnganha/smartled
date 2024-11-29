const Led = require("../models/led.model");
const mqttConfig = require("../config/mqtt.config");
module.exports.changeStatus = async (req, res) => {
  // const client = mqttConfig.client;
  // client.on("message", (topic, payload) => {
  //   console.log("Received Message:", topic, payload.toString());
  // });

  console.log(req.params);
  const status = req.params.status;
  const id = req.params.id;

  await Led.updateOne({ _id: id }, { status: status });
  res.redirect("back");
};
