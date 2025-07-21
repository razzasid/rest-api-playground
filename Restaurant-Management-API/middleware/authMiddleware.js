const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.json({ success: false, message: "please login first " });

  const secret = process.env.JWT_SECRET || "secretKey";

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;

    // return res
    //   .status(200)
    //   .json({ success: true, message: "You are authenticated" });
    next();
  } catch (err) {
    console.error("Invalid token", err.message);
    return res.status(401).json({ success: false });
  }
}

module.exports = checkAuth;
