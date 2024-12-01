const mqtt = require("mqtt");
const lightStatusHelper = require("../helper/lightStatus.helper");
var options = {
  host: "04f4aeeea4d84429864135c7870eb612.s1.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",
  username: "thai",
  password: "123456",
};
global._PUBLISH_TOPIC = "pbl3-esp32-001/lights/control";
// initialize the MQTT client
var client = mqtt.connect(options);

const topic = "pbl3-esp32-001/lights/status";
module.exports.connectMqtt = async () => {
  try {
    await client.on("connect", () => {
      console.log("MQTT broker is Connected");
      client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`);
      });
    });
  } catch (error) {
    console.log("Connect to Mqtt Broker failed");
  }
};
module.exports.client = client;
module.exports.handlerDataFromMQTT = (client) => {
  client.on("message", (topic, payload) => {
    console.log("Received Message:", topic, payload.toString());
    lightStates = JSON.parse(payload.toString());
    lightStatusHelper.updateDatabase(lightStates); //update status lights len database
    //update status lights len giao dien
    _io.emit("SERVER_SEND_STATUS_FROM_MQTT", lightStates);
  });
};
