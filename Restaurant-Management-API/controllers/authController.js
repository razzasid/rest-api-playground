const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function handleSignUp(req, res) {
  try {
    const body = req.body;

    if (!body || !body.name || !body.email || !body.phone || !body.password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const user = await User.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      password: hashedPassword,
    });

    return res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function handleLogIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
      return res
        .status(404)
        .json({ success: false, message: "email or password is incorrect" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "1h" }
    );
    return res.status(201).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  handleSignUp,
  handleLogIn,
};
