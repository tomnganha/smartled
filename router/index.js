const ledRoutes = require("./led.router");
module.exports = (app) => {
  app.use("/admin/led", ledRoutes);
};
