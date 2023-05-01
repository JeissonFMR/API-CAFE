

// este middle no lo estoy ocupanmdo
const isAdminRole = (req, res, next) => {

  if (!req.usuario) {
    return res.status(500).send({ msg: 'Se quiere verificar el role sin validar el token primero' })
  }


  const { role, name } = req.usuario;
  if (role !== 'ADMIN_ROLE') {
    return res.status(401).send({ msg: `${name} not is administrator` })
  }
  next();
}

const tieneRole = (...roles) => {
  return (req, res, next) => {


    if (!req.usuario) {
      return res.status(500).send({ msg: 'Se quiere verificar el role sin validar el token primero' })
    }

    console.log(roles);
    console.log(req.usuario.role);

    if (!roles.includes(req.usuario.role)) {
      return res.status(401).send({
        msg: `Service requires one of these roles ${roles}`
      })
    }
    next();
  }
}


module.exports = { isAdminRole, tieneRole }
