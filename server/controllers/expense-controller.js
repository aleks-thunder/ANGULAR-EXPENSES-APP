const userSchema = require('../models/user-model');
const config = require('../config/create-user.config');

// Create and Save a new User
exports.createUser = (req, res) => {

  // Get user data from app/register page
  const { name, login, email, password, passConfirm } = req.body

  // Save User in the database after checks
  if (!name || !login || !email || !password) {
    return res.status(422).json({ 'error': 'One of the input fields is empty' });
  };
  if (password !== passConfirm) {
    return res.status(422).json({ 'error': 'Password does not match' });
  };

  // Check if login/email already exist
  userSchema.findOne({ $or: [{'email': email}, {'login': login}] }, function (err, existingUser) {
    if (err) {
      return res.status(422).json({ 'error': 'err on exist:' + err });
    }
    if (existingUser) {
      return res.status(422).json({ 'error': `this email or login already in use!` });
    }
    else {
      
      // Create User
      const user = new userSchema({ name, login, email, password });
      user.save(function (err) {
        if (err) {
          return res.status(422).json({'error': 'err RegUser:' + err });
        }
        return res.status(200).json({ 'registered': true });
      });
    };
  });

}