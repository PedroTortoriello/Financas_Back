const mongoose = require("mongoose");

function mongoSchemaFinanças() {
  const ticketSchema = new mongoose.Schema({
    entradas: {
      type: Number,
      required: true
    },
    saidas: {
      type: String,
    }, 
    total: {
      type: String,
    }, 
    transacoes: {
      type: String,
    },

  });

  // Modelo para a coleção "tickets"
  return mongoose.model('Finanças', ticketSchema);
}

module.exports = mongoSchemaFinanças;
