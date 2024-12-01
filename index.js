const express = require("express");
const mongoose = require("mongoose");
const route = require("./router/index");
const Led = require("./models/led.model");
const methodOverride = require("method-override");
const mqtt = require("mqtt");
const mqttConfig = require("./config/mqtt.config");
const socketConfig = require("./config/socketio.config");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const StartSchedule = require("./config/schedule.config");

const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const port = 3001;
app.set("view engine", "pug");

// Cấu hình session
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

//flash
app.use(cookieParser("keyboard cat"));

//socketio
const server = createServer(app);
global._io = new Server(server);
socketConfig.connectionSocketIo();
//end sockhetio

//KET NOI MQTT
mqttConfig.connectMqtt();
const client = mqttConfig.client;
mqttConfig.handlerDataFromMQTT(client);
//END KET NOI MQTT

//Ket noi mongoose
mongoose.connect("mongodb://127.0.0.1:27017/smartLed");
//Ket noi mongoose
app.use(methodOverride("_method"));
//public cac file
app.use(express.static("public"));
//public cac file
//middleware
app.use(express.urlencoded({ extended: true }));
//code controller cho roter /

//end code controller cho route /
app.get("/", async (req, res) => {
  const leds = await Led.find({});
  StartSchedule();
  res.render("index", { title: "Hey", message: "Hello there!", leds: leds });
});
route(app);
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
