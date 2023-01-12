const { register, login, setAvatar, getallUsers } = require("../controller/userController");

const router = require("express").Router();

router.post("/register",register);
router.post("/login",login);
router.get("/users/:id",getallUsers);
router.post("/setAvatar/:id",setAvatar);

module.exports = router;