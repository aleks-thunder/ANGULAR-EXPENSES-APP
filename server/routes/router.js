const express = require('express');
const router = express.Router();
const passport = require('passport');
const { createUser, login } = require('../controllers/user-controller');
const expense = require('../controllers/expense-controller');

// Register
router.post('/register', createUser);

// Auth
router.post('/login', login);

// Create an expense
router.post('/', passport.authenticate('jwt', {session: false}), expense.createExpense);

// Get expenses
router.get('/dashboard', passport.authenticate('jwt', {session: false}), expense.getExpenses);

module.exports = router;