const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  
  user_id: String,
  category:     { type: String, unique: true, required: 'Caregory is required' },
  description:  { type: String, unique: true, required: 'Description is required' },
  amount:       { type: String, unique: true, required: 'Amount is required' },
  date:         { type: Date,   unique: true, required: 'Date is required' }

}, { timestamps: true });


module.exports = mongoose.model('Expense', expenseSchema);