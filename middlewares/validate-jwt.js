const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
require('dotenv').config();
const TOKEN_JWT = process.env.TOKEN_JWT


const validarJWT = async (req, res, next) => {

  const token = req.header('x-token');

  if (!token) {
    return res.status(401).send({ msg: 'There is no token in the request' })
  }

  try {
    const { uid } = jwt.verify(token, TOKEN_JWT)

    //SE AGREGA EL usuario logeado EN LA REQUEST
    const usuario = await Usuario.findById(uid);


    //si el usuario esta eliminado de la db
    if (!usuario) {
      return res.status(401).send({ msg: 'There is no token in the request' })
    }



    //verificar si el usuario logeado no esta eliminado es decir tiene el estado en true
    if (!usuario.state) {
      return res.status(401).send({ msg: 'There is no token in the request' })
    }


    //SE AGREGA EL usuario logeado EN LA REQUEST
    req.usuario = usuario;

    next()
  } catch (error) {
    console.log(error);

    res.status(401).send({ msg: 'Invalid token' });
  }

  next()
}

module.exports = {
  validarJWT

}