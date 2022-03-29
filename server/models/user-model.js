const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name: {
    type: String,
    required: 'Login is required',
  },

  login: {
    type: String,
    min: [4, 'Too short, min 4 characters are required'],
    required: 'Login is required',
  },
  
  email: {
    type: String,
    unique: true,
    required: 'Email is required',
  },
  
  password: {
    type: String,
    min: [8, 'Too short, min 4 characters are required'],
    required: 'password is required'
  },
  
  passConfirm: {
    type: String,
    min: [8, 'Too short, min 4 characters are required'],
  }
});

// Hash the password
userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return res.status(422).json({
        'error': 'There is an error while gensalt hash'
      });
    };

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return res.status(422).json({
          'error': 'There is an error while password hash'
        });
      };

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.hasSamePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('user-list', userSchema);