const mongoose = require('mongoose');
const express = require('express');
const config = require('./config/create-user.config');
const cors = require('cors');

const app = express();

let corsOptions = {
  origin: 'http://localhost:4200'
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

mongoose.connect(config.DB)
  .then( () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the SERVER SIDE !!!!.' });
});

require('./routes/routes')(app);

// set port listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` 🚀 💪 🐞 🥂 🐼 💳 💎 🛳  🦁 🍰 🏅 📕 🌏 💾 🔴 🔜  Server is running on port ${PORT}.`);
});