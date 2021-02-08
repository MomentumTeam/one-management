const User = require("../models/user");
const createError = require("http-errors");

class ApplicationController {
    static async getBitLockerPassword(req, res, next) {
        try {
            const type = req.query.type;
            const input = req.query.input;

            return res.send({
                password: "Liora123 Server"
            });
        } catch (error) {
            next(createError(500, error));
        }
    }

    static async getLapsPassword(req, res, next) {
        try {
            const computerName = req.query.computerName;

            return res.send({ password: "124578 Server" });
        } catch (error) {
            next(createError(500, error));
        }
    }

    static async updateVlan(req, res, next) {
        try {
            const macAddress = req.body.macAddress;
            const location = req.body.location;
            const vlan = req.body.vlan;

            return res.send({ message: "vlan שונה בהצלחה Server "  });
        } catch (error) {
            next(createError(500, error));
        }
    }
}

module.exports = ApplicationController;
