const express = require("express");


// import controller functions
const {
  loginUser,
  signupUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// forgot password route
router.post("/forgot-password", forgotPassword);

// reset password route
router.post("/reset-password/:token", resetPassword);



module.exports = router;
