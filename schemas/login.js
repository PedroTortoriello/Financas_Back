const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    maxlength: 36,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // Validação de email simples
  },
  password: {
    type: String,
    required: true,
    maxlength: 255,
  },
  userName: {
    type: String,
    required: true,
    maxlength: 255,
  },
  status_pagamento: {
    type: String,
    maxlength: 50,
    default: null, // O campo é opcional, então o valor padrão é `null`
  },
});

const login = mongoose.model('logins', loginSchema);

module.exports = login;
