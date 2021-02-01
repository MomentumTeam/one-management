const User = require("../models/user");
const createError = require("http-errors");

class UserController {
  static async getUser(req, res, next) {
    try {
      const user = await User.findOne({ userId: req.user.id });
      return res.send({
        userObj: req.user,
        history: user.history,
        favorites: user.favorites,
      });
    } catch (error) {
      next(createError(500, error));
    }
  }

  static async updateUser(req, res, next) {
    try {
      const user = await User.findOne({ userId: req.user.id });
      user.favorites = req.body.favorites ? req.body.favorites : user.favorites;
      user.history = req.body.history ? req.body.history : user.history;
      await user.save();
      return res.send(user);
    } catch (error) {
      next(createError(500, error));
    }
  }
}

module.exports = UserController;
