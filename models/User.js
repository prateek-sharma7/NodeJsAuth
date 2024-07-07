const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    requried: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [7, "Minimum password Length is 7 characters"],
  },
});

// This pre and post HOOKS in MONGOOSE will help to achieve password hashing

// // A function used to alert that a user has been created.
// userSchema.post("save", (doc, next) => {
//   console.log("new user has been created and saved", doc);
//   next();
// });

// A function used to alert that a user is about to create.
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
