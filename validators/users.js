const { check } = require('express-validator');
const { validationResults } = require('./useValidators');
const { isRoleValid, emailExists, existUserForId } = require('../helpers/db_validators');


const usersValidator = [
  check('name', 'Name is required').notEmpty(),
  check('password', 'The password must have a minimum of 6 characters').isLength({ min: 6 }),
  check('email', 'The email is not valid').isEmail(),
  check('email').custom(emailExists),
  // check('role', 'Not an allowed role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(isRoleValid),

  (req, res, next) => {
    return validationResults(req, res, next)
  }
]


const userPutValidator = [
  check('id', `The ID is not valid`).isMongoId(),
  check('id').custom(existUserForId),
  check('role').custom(isRoleValid),
  (req, res, next) => {
    return validationResults(req, res, next)
  }
]

const userDeleteValidator = [
  check('id', `The ID is not valid`).isMongoId(),
  check('id').custom(existUserForId),
  (req, res, next) => {
    return validationResults(req, res, next)
  }
]

module.exports = { usersValidator, userPutValidator, userDeleteValidator }