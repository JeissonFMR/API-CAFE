const { Router } = require('express')
const { UserController } = require('../controllers/users.controller')
const { usersValidator, userPutValidator, userDeleteValidator } = require('../validators/users')
const { validarJWT } = require('../middlewares/validate-jwt')
const { isAdminRole, tieneRole } = require('../middlewares/isAdminRole')

const router = Router()

module.exports.UsersAPI = (app) => {
  router
    .get('/', UserController.getUsers)
    .post('/', usersValidator, UserController.postUsers)
    .put('/:id', userPutValidator, UserController.updateUsers)
    .delete('/:id', validarJWT, tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'USER_ROLE'), userDeleteValidator, UserController.deleteUsers)
  app.use('/api/v1/users', router)
}