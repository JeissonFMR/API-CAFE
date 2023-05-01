const { generarJWT } = require("../helpers/generarJWT");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

module.exports.AuthController = {


  login: async (req, res) => {

    const { email, password } = req.body;

    try {
      //verificar si email existe
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(400).send({ msg: 'User / Password incorrect' })
      }

      //Si el usuario esta activo
      if (!usuario.state) {
        return res.status(400).send({ msg: 'User / Password incorrect' })
      }

      //Verificar password
      const validPassword = bcryptjs.compareSync(password, usuario.password)
      if (!validPassword) {
        return res.status(400).send({ msg: 'User / Password incorrect false password' })
      }

      //Generar JWT
      const token = await generarJWT(usuario)


      res.status(200).send({ usuario, token })
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: 'Talk to the administrator' })
    }
  }
}