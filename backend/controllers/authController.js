const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// the User model created in models folder
const User = require("../models/authModel");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

// signup a user
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);
    // create a token
    const token = createToken(user._id);

    res.status(200).json({ name, email, user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Use the static login method on the User model
    const user = await User.login(email, password);

    // Create a token
    const token = createToken(user._id);

    // Send the response with user details and token
    res
      .status(200)
      .json({ email: user.email, name: user.name, _id: user._id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// forgot password route
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // check if the email exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Email not found" });
  }

  // generate a reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetToken = resetToken;
  user.tokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
  await user.save();

  // send email with reset link
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Password Reset Request",
    html: `<p>Click <a href="http://localhost:4000/reset-password/${resetToken}">here</a> to reset your password.</p>`,
  };

  // send email
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).json({ error: "Email could not be sent." });
    }
    res.json({ message: "Password reset link sent to your email." });
  });
};

// reset password route
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  // Find the user with the reset token
  const user = await User.findOne({
    resetToken: token,
    tokenExpiration: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ error: "Invalid or expired token." });
  }

  // Update the user's password
  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetToken = null; // Clear token
  user.tokenExpiration = null;
  await user.save();

  res.json({ message: "Password reset successful" });
};

module.exports = { signupUser, loginUser, forgotPassword, resetPassword };
