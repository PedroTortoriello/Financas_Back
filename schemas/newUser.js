const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Criação do schema para o usuário
const newUserSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => uuidv4(), // Define o UUID como o ID do documento
    unique: true
  },
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  status_pagamento: {
    type: String,
    enum: ['pendente', 'pago'],
    default: 'pendente'
  }
}, { timestamps: true }); // Adiciona timestamps para createdAt e updatedAt

// Criação e exportação do modelo
const newUser = mongoose.model('newUser', newUserSchema);

module.exports = newUser;
