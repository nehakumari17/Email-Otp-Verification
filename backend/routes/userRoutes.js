const router = require("express").Router()
const { register, login, verifyOtp } = require("../controllers/userController")

router.route("/").post(register)

router.route("/login").post(login)

router.route("/verify-otp").post(verifyOtp)

module.exports = router 