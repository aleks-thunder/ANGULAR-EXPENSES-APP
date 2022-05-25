const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
  
  user_id: String,
  categories: []

});

module.exports = mongoose.model('Category', categoriesSchema);