const express = require('express')
const cors = require('cors');

const { UsersAPI } = require('./routes/users.routes');
const { AuthAPI } = require('./routes/auth.routes');
const { dbConnection } = require('./database/config');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

UsersAPI(app)
AuthAPI(app)

app.listen(process.env.PORT, () => {
  console.log(`Server listening on  http://localhost:${process.env.PORT}`);
})


//conexión a base de datos
dbConnection()