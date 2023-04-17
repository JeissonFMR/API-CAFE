const Role = require('../models/role.model');
const Usuario = require('../models/usuario');


const isRoleValid = async (role = '') => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`The role ${role} not found`);
  }
}

const emailExists = async (email = '') => {
  const existEmail = await Usuario.findOne({ email });

  if (existEmail) {
    throw new Error(`The email: ${email}, already exists`);
  }
}

//Actualizar
const existUserForId = async (id) => {
  const existUser = await Usuario.findById(id);

  if (!existUser) {
    throw new Error(`The ID: ${id}, not found`);
  }
}


module.exports = {
  isRoleValid,
  emailExists,
  existUserForId
}