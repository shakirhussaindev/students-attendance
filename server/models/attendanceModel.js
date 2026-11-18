const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  date: String,
  name: String,
  attendance: { type: Boolean, default: false },
  homework: { type: Boolean, default: false },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
