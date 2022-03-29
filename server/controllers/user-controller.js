const userSchema = require('../models/user-model');
const config = require('../config/create-user.config');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb')
const Mongo = new MongoClient(config.DB)


const createUniqueCollection = async(login) =>{
  try {
    await Mongo.connect()
    await Mongo.db().createCollection(`login_${login}`)
  } catch (error) {
    console.log(error);
  }
}
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

      // Create collection for new User
      createUniqueCollection(login);
    };
  });

}

exports.login = function (req, res) { 
  const { login, password } = req.body

  if (!login || !password) {
    return res.status(422).json({ 'error': 'Please provide login or password' })
  }
  
  userSchema.findOne({ login }, function (err, user) {
    if (err) {
      return res.status(422).json({
        'error': 'Oops! Something went wrong'
      });
    }

    if (!user) {
      return res.status(422).json({ 'error': 'Invalid user' });
    }

    if (user.hasSamePassword(password)) {
      json_token = jwt.sign(
        {
          userId: user.id,
          login: user.login
        },
        config.secret,
        { expiresIn: '1h' });

      return res.json(json_token);
    }
    else {
      return res.status(422).json({ 'error': 'Wrong login or password' });
    }
  });
};