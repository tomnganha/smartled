const mqtt = require("mqtt");
const protocol = "mqtt";
const host = "broker.hivemq.com";
const portMqtt = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `${protocol}://${host}:${portMqtt}`;

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});
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
