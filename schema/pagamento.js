const mongoose = require("mongoose");

function mongoSchemaFinancas() {
  const ticketSchema = new mongoose.Schema({
    description: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }, 
    date: {
      type: Date,
      required: true
    }, 
    _id: mongoose.Schema.Types.ObjectId, 
  });

  // Modelo para a coleção "financas"
  return mongoose.model('Financas', ticketSchema);
}

module.exports = mongoSchemaFinancas;
