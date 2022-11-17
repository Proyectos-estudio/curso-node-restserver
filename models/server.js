const express = require("express");
const cors = require("cors");
const {dbConnection} = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuarioPath = "/api/usuarios";

    // conectar a base de datos
    this.conectarDB();

    //middlewares
    this.middlewares();

    // lectura y parseo del body
    this.app.use(express.json());

    //routes
    this.routes();
  }

  /*  ******************************************
   ************* funciones *********************
   *********************************************
   */

  // 1. Funcion para conectar a la base de datos

  async conectarDB() {
    await dbConnection();
  }

  // 2. Funcion para los middlewares
  middlewares() {
    // CORS
    this.app.use(cors());

    //directorio publico
    this.app.use(express.static("public"));
  }

  // 3. Funcion para las rutas
  routes() {
    this.app.use(this.usuarioPath, require("../routes/user"));
  }

  // 4. Funcion pasa saber el puerto en el que esta corriendo el servidor
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
