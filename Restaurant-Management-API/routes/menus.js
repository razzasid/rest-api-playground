const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ message: "list of all menus" });
});

module.exports = router;
