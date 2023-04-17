const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')


module.exports.UserController = {


  getUsers: async (req, res) => {
    try {

      const { hasta = 5, desde = 0 } = req.query;

      const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ state: true }),

        Usuario.find({ state: true })
          //paginación
          .skip(Number(desde))
          .limit(Number(hasta))
      ])
      res.status(200).send({ total, usuarios })

    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'An error occurred, please contact the Administrator.' })
    }
  },

  postUsers: async (req, res) => {


    try {
      //no permito mas cosas
      const { name, email, password, role } = req.body;
      const usuario = new Usuario({ name, email, password, role });

      //La verificación del correo electrónico esta en los helpers 

      //Encriptar la contraseña
      const salt = bcrypt.genSaltSync()
      usuario.password = bcrypt.hashSync(password, salt, 5);
      // Guardar base de datos
      await usuario.save()

      res.send({ usuario })
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'An error occurred, please contact the Administrator.' })
    }

  },
  updateUsers: async (req, res) => {
    try {
      const { params: { id } } = req;

      //datos que no permito actualizar
      const { _id, password, google, email, ...resto } = req.body

      //TODO: Validar con la base de datos
      if (password) {
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync()
        resto.password = bcrypt.hashSync(password, salt, 5);
      }

      const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

      res.status(200).send({ usuario })
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'An error occurred, please contact the Administrator.' })
    }
  }

}