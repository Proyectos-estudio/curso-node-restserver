const { response } = require("express");

const userGet = (req, res = response) => {
    // const queryParams = req.query; // Obtiene los parámetros de la petición
    const {q, nombre} = req.query; // Obtiene los parámetros de la petición y los desestructura

  res.json({
    msg: "get API - controller",
    q,
    nombre,
  });
};

const userPost = (req, res = response) => {
    // const body = req.body; // Obtiene todo el body de la petición
    const { nombre, edad } = req.body; // Obtiene el body de la petición y lo desestructura

    res.status(201).json({
        msg: "post API - controller",
        // body,
        name : nombre,
        age: edad,
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
