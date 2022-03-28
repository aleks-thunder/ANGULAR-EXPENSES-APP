const mongoose = require("mongoose");

let schema = mongoose.Schema({
  email: String,
  name: String,
  login: String,
  password: String,
}, );

const signSchema = mongoose.model('user-details', schema);
module.exports = signSchema

