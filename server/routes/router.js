const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require('../controllers/user.controller');
const expense = require('../controllers/expense.controller');
const categories = require('../controllers/categories.controller');

/** USER ROUTER */
router.post('/register', user.createUser);

router.post('/login', user.login);

/** EXPENSE ROUTER */
router.post('/', passport.authenticate('jwt', {session: false}), expense.createExpense);

router.get('/dashboard', passport.authenticate('jwt', {session: false}), expense.getExpenses);

router.put('/dashboard/:id', passport.authenticate('jwt', {session: false}), expense.updateExpenses);

router.delete('/dashboard/:id', passport.authenticate('jwt', {session: false}), expense.deleteExpenses);


/** CATEGORIES ROUTER */
router.post('/categories', passport.authenticate('jwt', {session: false}), categories.saveCategories);

router.get('/categories', passport.authenticate('jwt', {session: false}), categories.getCategories);

module.exports = router;