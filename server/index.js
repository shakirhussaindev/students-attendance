require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
const port = process.env.PORT || 5000

const connectMongodb = require('./config/mongodbConfig')
connectMongodb()

const {
  registrationController,
  loginController,
} = require("./controllers/authenticationController");

const Attendance = require("./models/attendanceModel");

app.post("/registration", registrationController);
app.post("/login", loginController);


app.get("/attendance/:date", async (req, res) => {
  let {date} = req.params
  let data = await Attendance.find({date});
  res.json(data);
});


app.post("/attendance", async (req, res) => {
  const { date, records } = req.body;
  await Attendance.insertMany(records.map((r) => ({ ...r, date })));
  res.status(201).json({ success: true });
});


app.patch("/attendance/:id", async (req, res) => {
  const { attendance, homework } = req.body;
  await Attendance.findByIdAndUpdate(req.params.id, { attendance, homework });
  res.json({ success: true });
});

app.get("/", (req, res)=>{
  res.send("Hello developer")
})

app.listen(port, ()=>{
  console.log("Server is running")
})