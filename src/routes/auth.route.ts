const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/users",authController.getUsers)
router.post("/logout", authController.logout);

module.exports = router;