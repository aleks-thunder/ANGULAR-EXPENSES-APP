const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  caregory: {
    type: String,
    required: 'Caregory is required',
  },

  description: {
    type: String,
    required: 'Login is required',
  },
  
  amount: {
    type: String,
    unique: true,
    required: 'Amount is required',
  },
  
  date: {
    type: Date,
    required: 'Date is required'
  },
  
  expense_id: {
    type: String,
    required: 'expense_id is required'
  }
});


module.exports = expenseSchema;