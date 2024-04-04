const mongoose = require("mongoose");

function mongoSchemaLogin() {
  const loginSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    confirmpassword: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
      unique: true
    },
  });
  
  return mongoose.model('Login', loginSchema);
};

module.exports = mongoSchemaLogin;