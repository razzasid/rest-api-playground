const express = require("express");
const router = express.Router();
const { handleSignUp, handleLogIn } = require("../controllers/authController");

router.post("/signup", handleSignUp);
router.post("/login", handleLogIn);

module.exports = router;
