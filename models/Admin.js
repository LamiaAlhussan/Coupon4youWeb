const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

adminSchema.methods.hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

adminSchema.methods.comparePasswords = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

let Admin= mongoose.model("Admin", adminSchema, "admins");

module.exports = Admin;
