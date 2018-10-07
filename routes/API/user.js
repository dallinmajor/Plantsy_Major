const router = require("express").Router();
const userController = require('../../controllers/user');

// api/user/
router.route('/')
    .post(userController.validateUser)
    .get(userController.findAll);

// api/user/register
router.route("/register")
    .post(userController.create);

// api/user/:id
router.route("/:username")
    .get(userController.findUser)
    .put(userController.update)
    .delete(userController.remove);

module.exports = router;