const { Router } = require("express");
const { check } = require("express-validator");

const {
  userGet,
  userPut,
  userPost,
  userDelete,
} = require("../controllers/userController");

const router = Router();

router.get("/", userGet);

router.put("/:id", userPut);

router.post("/", [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El correo no es válido').isEmail(),
  check('password', 'El password debe ser de más de 6 letras').isLength({ min: 6 }),
  check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
] ,userPost);

router.delete("/", userDelete);

module.exports = router;
