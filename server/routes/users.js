const Router = require("express").Router;
const UserController = require("../controllers/users.js");

const usersRouter = Router();

/* GET users listing. */
usersRouter.get("/", UserController.getUser);

usersRouter.put("/", UserController.updateUser);

module.exports = usersRouter;
