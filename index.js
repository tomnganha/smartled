const express = require("express");
const mongoose = require("mongoose");
const route = require("./router/index");
const Led = require("./models/led.model");
const methodOverride = require("method-override");
const app = express();
const port = 3000;
app.set("view engine", "pug");

//Ket noi mongoose

mongoose.connect("mongodb://127.0.0.1:27017/smartLed");
//Ket noi mongoose
app.use(methodOverride("_method"));
//public cac file
app.use(express.static("public"));
//public cac file
app.get("/", async (req, res) => {
  const leds = await Led.find({});

  res.render("index", { title: "Hey", message: "Hello there!", leds: leds });
});
route(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
