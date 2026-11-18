const mongoose = require('mongoose')
const {Schema} = mongoose

let newUser = new Schema({
  fullname: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  }
})


module.exports = mongoose.model("User", newUser)