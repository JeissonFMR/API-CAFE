const { Router } = require('express');
const { AuthController } = require('../controllers/auth.controller');
const { loginValidator } = require('../validators/auth');

const router = Router();

module.exports.AuthAPI = (app) => {
  router
    .post('/login', loginValidator, AuthController.login)
  app.use('/api/v1/auth', router)
}