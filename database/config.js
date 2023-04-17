const mongoose = require('mongoose')


const dbConnection = async () => {
  try {

    const db = process.env.MONGODB_CNN
    await mongoose.connect(db)

    console.log('***Base de datos corriendo***');
  } catch (error) {
    throw new Error('***Error al iniciar la base de datos***')
  }
}

module.exports = { dbConnection }