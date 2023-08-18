const express = require("express")
const router = express.Router()
const { register, login, update } = require("./auth");
router.route("/update").put(update);
router.route("/register").post(register)
router.route("/login").post(login);
module.exports = router;
