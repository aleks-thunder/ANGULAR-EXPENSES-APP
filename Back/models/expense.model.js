const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  
  user_id: String,
  date:         { type: String, unique: true, required: 'Date is required' },
  amount:       { type: String, unique: true, required: 'Amount is required' },
  description:  { type: String, unique: true, required: 'Description is required' },
  category:     { type: String, unique: true, required: 'Caregory is required' }

}, { timestamps: true });


module.exports = mongoose.model('Expense', expenseSchema);