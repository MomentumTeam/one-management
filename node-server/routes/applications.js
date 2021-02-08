const Router = require("express").Router;
const ApplicationController = require("../controllers/applications");

const applicationRouetr = Router();

applicationRouetr.get("/BitLocker/password", ApplicationController.getBitLockerPassword);
applicationRouetr.get("/Laps/AdminPassword", ApplicationController.getLapsPassword);
applicationRouetr.put("/VlanChange", ApplicationController.updateVlan);


module.exports = applicationRouetr;
