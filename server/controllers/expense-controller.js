const expenseSchema = require('../models/expense-model');


exports.createExpense = (req, res) => {
  const user_id = req.user._id;

  const { date, category, description, amount } = req.body

  const expense = new expenseSchema({ user_id, date, category, description, amount });
  expense.save(function (err) {
    if (err) {
      return res.status(422).json({ 'error': 'Can not create an expense' + err });
    }
    return res.status(200).json({ 'expense submitted': true });
  });

}

exports.getExpenses = (req, res) => {
  const user_id = req.user._id;

  expenseSchema.find({user_id})
  .then((userExpenses) => {
    res.send(userExpenses)
  })
  .catch((e) => res.send(e));
} 
