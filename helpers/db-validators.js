const Role = require("../models/role");
const Usuario = require("../models/user");

const isRoleValid = async (rol = "") => {
  const existRol = await Role.findOne({ rol }); // {rol} hace referencia a la propiedad rol del objeto Role
  if (!existRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const emailExists = async (email = "") => {
  // verificar si el correo existe
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El correo ${email} ya está registrado`);
  }
};

const userExistsById = async (id) => {
  // verificar si el correo existe
  const existUser = await Usuario.findById( id );
  if (!existUser) {
    throw new Error(`El usuario con id: ${id} no existe`);
  }
};


module.exports = {
  isRoleValid,
  emailExists,
  userExistsById,
};
