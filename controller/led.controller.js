const Led = require("../models/led.model");
const mqttConfig = require("../config/mqtt.config");

module.exports.changeStatus = async (req, res) => {
  let light = await Led.findOne({ _id: req.params.id });
  console.log(light);
  const client = mqttConfig.client;
  // client.on("connect", (topic, payload) => {
  //   console.log("Received Message:", topic, payload.toString());
  // });
  let data = { [light.title]: req.params.status };
  data = JSON.stringify(data);
  console.log(data);
  console.log(typeof data);
  await client.publish("pbl3-esp32-001/lights/control", data, (error) => {
    if (error) {
      console.error(error);
    }
  });
  // client.on("connect", async () => {
  //   console.log("start send to MQTT");

  //   });
  // });
  console.log(req.params);
  const status = req.params.status;
  const id = req.params.id;

  await Led.updateOne({ _id: id }, { status: status });
  res.redirect("back");
};
