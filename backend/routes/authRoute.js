const express = require("express");


// import controller functions
const { loginUser, signupUser } = require("../controllers/authController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);



module.exports = router;
