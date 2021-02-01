const Router = require("express").Router;
const authentication = require("../controllers/authentication");

const indexRouter = Router();

/* GET home page. */
indexRouter.get("/", authentication.isAuthenticated, function (req, res, next) {
  res.render("index", { title: "Express", name: req.user.name });
});

module.exports = indexRouter;
