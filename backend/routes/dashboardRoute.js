const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/userdashboard", protect, (req, res) => {
  res.json({ message: `Welcome to your dashboard, ${req.user.name}!` });
});

module.exports = router;
