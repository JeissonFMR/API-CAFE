
const jwt = require('jsonwebtoken')
require('dotenv').config();

const TOKEN_JWT = process.env.TOKEN_JWT


/**
 * GENERAR TOKEN DE SESIÓN O FIRMAR TOKEN
 * @param {uid} uid 
 * @returns 
 */
const generarJWT = async (usuario) => {

  try {
    const payload = {
      uid: usuario.id
    };

    const sign = await jwt.sign(payload, TOKEN_JWT, {
      expiresIn: '12h'
    },)

    return sign;
  } catch (error) {
    console.log(error);
    throw new Error('Could not generate token')
  }
}

module.exports = {
  generarJWT
}