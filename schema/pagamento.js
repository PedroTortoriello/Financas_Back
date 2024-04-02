const mongoose = require("mongoose");

function mongoSchemaFinancas() {
  const ticketSchema = new mongoose.Schema({
    description: {
      type: Number,
      required: true
    },
    amount: {
      type: String,
    }, 
    date: {
      type: String,
    }, 
  });

  // Modelo para a coleção "tickets"
  return mongoose.model('Financas', ticketSchema);
}

module.exports = mongoSchemaFinancas;
