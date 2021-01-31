const Router = require("express").Router;

const indexRouter = Router();

/* GET home page. */
indexRouter.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = indexRouter;
