const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request  , res = response, next) => {
    const token = req.header('k-token');

    if(!token){
        return res.status(401).json({
            msg: 'Usuario no autenticado'
        });
    }

    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Obtener el usuario que corresponde al uid
        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en BD'
            });
        }

        // Verificar si el usuario esta activo
        if(!user.status){
            return res.status(401).json({
                msg: 'Usuario no autenticado - estado: false'
            });
        }

        req.user = user;

        next();
    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }

}

module.exports = {
    validateJWT
}