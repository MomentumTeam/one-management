const Router = require("express").Router;
const UserController = require("../controllers/users.js");

const usersRouter = Router();

/* GET users listing. */
usersRouter.get("/:userId", UserController.getUser);

usersRouter.post("/", UserController.createUser);

usersRouter.put("/", UserController.updateUser);

usersRouter.delete("/:userId", UserController.deleteUser);

module.exports = usersRouter;
