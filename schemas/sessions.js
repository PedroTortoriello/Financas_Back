const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  session_id: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
  },
  expires: {
    type: Number,
    required: true,
  },
  data: {
    type: String, // Usado para armazenar dados em formato texto
    required: true,
  },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
