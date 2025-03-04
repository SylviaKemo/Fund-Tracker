const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, //ensures an email is used once
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
    default: null,
  }, // Stores reset token
  tokenExpiration: {
    type: Date,
    default: null,
  }, // Stores token expiration
});

userSchema.statics.signup = async function (name, email, password) {
  // validation
  if (!name || !email || !password) {
    throw Error("All fields must be filled");
  }

  // not valid email
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  //   not valid password
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });
  // checks if the email exists
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash });

  return user;
};


// static login method
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  // checks if the user exists
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};


module.exports = mongoose.model("User", userSchema);
