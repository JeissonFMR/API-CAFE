const { Router } = require('express')
const { UserController } = require('../controllers/users.controller')
const { usersValidator, userPutValidator, userDeleteValidator } = require('../validators/users')

const router = Router()

module.exports.UsersAPI = (app) => {
  router
    .get('/', UserController.getUsers)
    .post('/', usersValidator, UserController.postUsers)
    .put('/:id', userPutValidator, UserController.updateUsers)
    .delete('/:id', userDeleteValidator, UserController.deleteUsers)
  app.use('/api/v1/users', router)
}