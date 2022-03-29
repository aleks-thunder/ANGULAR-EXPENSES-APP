module.exports = app => {
  const controllers = require('../controllers/user-controller');
  const router = require('express').Router();

  router.post('/register', controllers.createUser);

  router.post('/login', controllers.login);
  
  app.use('/api', router);
};