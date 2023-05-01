const { check } = require('express-validator')
const { validationResults } = require('./useValidators')

const loginValidator = [
  check('email', 'The email address is required').isEmail(),
  check('password', 'The password is required').notEmpty(),

  (req, res, next) => {
    return validationResults(req, res, next)
  }
]


module.exports = {
  loginValidator
}

