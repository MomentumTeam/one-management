const passport = require("../controllers/passport");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  app.get("/api/login", passport.authenticate("shraga"), function (req, res, next) {
    return res.status(200).json(req.user);
  });

  app.post("/api/success", passport.authenticate("shraga"), function (req, res, next) {
    // return res.redirect(req.user.relayState);
    return res.redirect(process.env.CLIENT_URL || "http://localhost:3000");
  });
};
