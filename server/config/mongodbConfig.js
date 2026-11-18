const mongoose = require("mongoose");

function connectMongodb() {
  mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database connected succesfully");
  });
}

module.exports = connectMongodb