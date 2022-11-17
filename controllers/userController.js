const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/user");



const userGet = (req, res = response) => {
    // const queryParams = req.query; // Obtiene los parámetros de la petición
    const {q, nombre} = req.query; // Obtiene los parámetros de la petición y los desestructura

  res.json({
    msg: "get API - controller",
    q,
    nombre,
  });
};

const userPost = async (req, res = response) => {

   

    // const body = req.body; // Obtiene todo el body de la petición
    // const { nombre, edad } = req.body; // Obtiene el body de la petición y lo desestructura
    const { name, email, password, role } = req.body; // Obtiene el body de la petición y lo desestructura
    
    const usuario = new Usuario({
        name,
        email,
        password,
        role,
    });
    
    // verificar si el correo existe
    const existeEmail = await Usuario.findOne({ email});
    if (existeEmail) {
        return res.status(400).json({
            msg: "El correo ya está registrado",
        });
    }

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);


    // Guardar en BD
    await usuario.save();

    res.status(201).json({
        msg: "posts API - controller",
        usuario
        // name : nombre,
        // age: edad,
    });
};

const userPut = (req, res = response) => {
    const id = req.params.id; // Obtiene el id de la petición

    res.json({
        msg: "put API - controller",
        id,
    });
};

const userDelete = (req, res = response) => {
    res.json({
        msg: "delete API - controller",
    });
};


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
};
