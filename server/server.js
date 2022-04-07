const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');

const app = express();
const config = require('./config/db.config');
const router = require('./routes/router');

mongoose.connect(config.DB,
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }
  )
  .then( () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database ' + err) }
);

// CORS Middleware
app.use(cors());


// Set static folder for app
app.use(express.static(path.join(__dirname, 'public')))

// Body parser Middleware
app.use(bodyParser.json());

app.use(session({
  secret: 'cookie_secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/', router);

// Index Route
app.get('/', (req, res) => {
  res.send('Welcome to the SERVER SIDE !!!')
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` 🚀 💪 🐞 🥂 🐼 💳 💎 🛳  🦁 🍰 🏅 📕 🌏 💾 🔴 🔜  Server is running on port ${PORT}.`);
});