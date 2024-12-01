const ledRoutes = require("./led.router");
const scheduleRoutes = require("./schedule.router");
module.exports = (app) => {
  app.use("/admin/led", ledRoutes);
  app.use("/admin/schedule", scheduleRoutes);
};
