exports.isAuthenticated = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect("/login?RelayState=" + encodeURIComponent(req.originalUrl.replace("&", "%26")));
    }
  } catch (e) {
    return res.status(500).send(e);
  }
};
