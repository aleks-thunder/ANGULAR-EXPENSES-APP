const userSchema = require('../models/user.model');
const config = require('../config/db.config');
const jwt = require('jsonwebtoken');

// Create and Save a new User
exports.createUser = (req, res) => {

  // Get user data from app/register page
  const { name, login, email, password, passConfirm } = req.body;

  if (password !== passConfirm) return res.status(422).json({ 'error': 'Passwords does not match' });

  // Check if login/email already exist
  userSchema.findOne({ $or: [{'email': email}, {'login': login}] }, function (err, existingUser) {
    if (err) {
      return res.status(422).json({ 'error': 'Oops something went wrong' });
    }
    if (existingUser) {
      return res.status(422).json({ 'error': `This email or/and login already in use!` });
    }
    else {
      
      // Create User
      const user = new userSchema({ name, login, email, password });
      user.save(function (err) {
        if (err) return res.status(422).json({ 'error': 'Oops something went wrong' });
        return res.status(200).json({ 'registered': true });
      });
    };
  });

}

exports.login = function (req, res) { 

  const { login, password } = req.body;

  userSchema.findOne({ login }, function (err, user) {
    if (err) return res.status(422).json({ 'error': 'Oops! Something went wrong' });
    
    if (!user) return res.status(422).json({ 'error': 'This user is not existing' });

    if (user.comparePasswords(password)) {
      const token = jwt.sign(user.toJSON(), config.secret, {
        expiresIn: '30m'
      });

      res.json({
        success: true,
        token: 'JWT ' + token,
        user: {
          id: user._id,
          name: user.name,
          login: user.login,
          email: user.email,
        }
      });
    } else return res.status(422).json({'error': 'Wrong password'});
  });
  
};
