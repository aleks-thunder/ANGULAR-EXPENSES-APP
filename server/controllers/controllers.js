const mongoose = require("mongoose");
const signSchema = require('../models/sign-module')
const createUserDB = require('../config/create-user.config')

// Create and Save a new User
exports.createUser = async (req, res) => {

  await createUserDB(req.body.login)
  // Get user data
  const newUser = new signSchema({
    email:    req.body.email,
    name:     req.body.name,
    login:    req.body.login,
    password: req.body.password,
  });

  // Save User in the database
  newUser
    .save(newUser)
    .then(data => {
      console.log(`New User <<${req.body.name}>> created`);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
  
  // Disconnect from newly created db, so can add new user again
    setTimeout(() => {
      mongoose.connection.close();
      console.log(`disconnected from <<Login__${req.body.login}>> database`);
    }, 2000);
};