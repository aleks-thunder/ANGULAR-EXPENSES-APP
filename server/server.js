const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

// const db = require("./models");
// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Connected to the mongoDB!");
//   })
//   .catch(err => {
//     console.log("Cannot connect to the mongoDB!", err);
//     process.exit();
//   });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the SERVER SIDE !!!!." });
});

require("./routes/routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` 🚀💪🐞🥂 🐼💳💎 🛳  🦁 🍰 🏅📕🌏💾 🔴 🔜  Server is running on port ${PORT}.`);

});


// const { MongoClient } = require('mongodb');

// let a = 'qwer'
// const mongo = new MongoClient(`mongodb+srv://budget-db:budget_password_1@budget-cluster.3yfgv.mongodb.net/${a}`)

// const run = async () =>{
//   try {
//     await mongo.connect()
//     await mongo.db().createCollection(a.toString())
//     await mongo.db().drop
//   } catch (e) {
//     console.log(e);
//   }

// }
// run()