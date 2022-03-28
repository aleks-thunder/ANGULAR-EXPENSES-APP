const mongoose = require("mongoose");

module.exports = function createUserDB(login) {
  return mongoose
  .connect(`mongodb+srv://budget-db:budget_password_1@budget-cluster.3yfgv.mongodb.net/Login__${login}?retryWrites=true&w=majority`)
  .then(() => {
    console.log(`created new database: <<Login__${login}>> !`);
  })
  .catch(err => {
    console.log("Cannot connect to the mongoDB!", err);
    process.exit();
  });
}