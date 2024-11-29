const Led = require("../models/led.model");
module.exports.updateDatabase = (lightStatus) => {
  try {
    const bulkOps = Object.keys(lightStatus).map(async (light) => {
      await Led.updateOne({ title: light }, { status: lightStatus[light] });
      //   updateOne: {
      //     filter: { title: light },
      //     update: { status: lightStatus[light] },
      //     upsert: true,
      //   },
    });

    //await Light.bulkWrite(bulkOps);
    console.log("Database updated successfully");
  } catch (error) {
    console.error("Database update error:", error);
  }
  //   console.log(lightStatus);
  //   const bulkOps = Object.keys(lightStatus);
  //   console.log(bulkOps);
  //   console.log(typeof bulkOps);
};
