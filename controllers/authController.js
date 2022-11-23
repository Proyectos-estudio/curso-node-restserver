const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // VERIFICAR SI EL EMAIL EXISTE
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - email",
      });
    }

    // VERIFICAR SI EL USUARIO ESTA ACTIVO
    if (!user.status) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - status: false",
      });
    }

    // VERIFICAR LA CONTRASEÑA
    const comparePassword = bcryptjs.compareSync(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }
    // GENERAR EL JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
