function mongoSchemaLogin() {
  const mongoose = require("mongoose");
  var loginSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
      unique: true
    }
  })
  //Collection
  return mongoose.model("login", loginSchema);
}

module.exports = mongoSchemaLogin;