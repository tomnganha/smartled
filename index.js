const express = require("express");
const mongoose = require("mongoose");
const route = require("./router/index");
const Led = require("./models/led.model");
const methodOverride = require("method-override");
const mqtt = require("mqtt");
const mqttConfig = require("./config/mqtt.config");
const lightStatusHelper = require("./helper/lightStatus.helper");

const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const port = 3000;
app.set("view engine", "pug");

//socketio
const server = createServer(app);
const io = new Server(server);
global._io = io;

//end sockhetio

//KET NOI MQTT
const protocol = "mqtt";
const host = "broker.hivemq.com";
const portMqtt = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `${protocol}://${host}:${portMqtt}`;

/////
// const client = mqtt.connect(connectUrl, {
//   clientId,
//   clean: true,
//   connectTimeout: 4000,
//   reconnectPeriod: 1000,
// });

// client.on("connect", () => {
//   console.log("MQTT broker is Connected ");
// });
//pbl3-esp32-001/lights/control
//pbl3-esp32-001/lights/status
// const topic = "pbl3-esp32-001/lights/status";
// client.on("connect", () => {
//   console.log("MQTT broker is Connected");
//   client.subscribe([topic], () => {
//     console.log(`Subscribe to topic '${topic}'`);
//   });
// });
mqttConfig.connectMqtt();
const client = mqttConfig.client;
_io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  //socket.emit("SERVER_SEND_STATUS_FROM_MQTT", lightStates);
});
client.on("message", (topic, payload) => {
  console.log("Received Message:", topic, payload.toString());
  lightStates = JSON.parse(payload.toString());
  lightStatusHelper.updateDatabase(lightStates); //update status lights len database
  //update status lights len giao dien
  _io.emit("SERVER_SEND_STATUS_FROM_MQTT", lightStates);
});

//END KET NOI MQTT
//Ket noi mongoose

mongoose.connect("mongodb://127.0.0.1:27017/smartLed");
//Ket noi mongoose
app.use(methodOverride("_method"));
//public cac file
app.use(express.static("public"));
//public cac file

//code controller cho roter /

//end code controller cho route /
app.get("/", async (req, res) => {
  const leds = await Led.find({});

  res.render("index", { title: "Hey", message: "Hello there!", leds: leds });
});
route(app);
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
