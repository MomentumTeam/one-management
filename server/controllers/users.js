const User = require("../models/user");
const createError = require("http-errors");

class UserController {
  static async getUser(req, res, next) {
    try {
      const user = await User.findOne({ userId: req.params.userId });
      res.send(user);
    } catch (error) {
      next(createError(500, error));
    }
  }

  static async createUser(req, res, next) {
    try {
      const user = new User(req.body);
      user.save();
      res.send(user);
    } catch (error) {
      next(createError(500, error));
    }
  }

  static async updateUser(req, res, next) {
    try {
      const user = await User.findOne({ userId: req.body.userId });
      user.favorites = req.body.favorites ? req.body.favorites : user.favorites;
      user.history = req.body.history ? req.body.history : user.history;
      await user.save();
      res.send(user);
    } catch (error) {
      next(createError(500, error));
    }
  }

  static async deleteUser(req, res, next) {
    try {
      await User.deleteOne({ userId: req.params.userId });
      res.send("ok");
    } catch (error) {
      next(createError(500, error));
    }
  }
}

module.exports = UserController;
