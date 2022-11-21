const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/user");
const { emailExists } = require("../helpers/db-validators");

const userGet = async (req = request, res = response) => {
  // const queryParams = req.query; // Obtiene los parámetros de la petición
  // const {q, nombre} = req.query; // Obtiene los parámetros de la petición y los desestructura

  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

//   const users = await Usuario.find(query)
//     .skip(Number(from))
//     .limit(Number(limit));

//   const total = await Usuario.countDocuments(query);

  const [total, users] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
//    resp
    // msg: "get API - controller",
    total,
    users,
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

  // Encriptar la contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  // Guardar en BD
  await usuario.save();

  res.status(201).json({
    msg: "posts API - controller",
    usuario,
    // name : nombre,
    // age: edad,
  });
};

const userPut = async (req, res = response) => {
  const id = req.params.id; // Obtiene el id de la petición
  const { _id, password, google, email, ...resto } = req.body; // Obtiene el body de la petición y lo desestructura

  // TODO: validar contra base de datos
  if (password) {
    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: "put API - controller",
    id,
    usuario,
  });
};

const userDelete = async (req, res = response) => {

    const {id}= req.params;

    // Eliminación física
    // const user = await Usuario.findByIdAndDelete(id); // no se recomienda usar por que no se puede recuperar y se pierde integridad de datos

    const user = await Usuario.findByIdAndUpdate(id, {status: false});

  res.json(user);
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
