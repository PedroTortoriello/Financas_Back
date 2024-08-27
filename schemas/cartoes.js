const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const cardSchema = new mongoose.Schema({
  cardNumber: {
    type: Number,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true,
    maxlength: 36
  },
  name: {
    type: String,
    required: true,
    maxlength: 255
  },
  limite: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    min: 0,
    max: 9999999999.99
  },
  type: {
    type: String,
    required: true,
    maxlength: 50
  },
  closingDay: {
    type: Number,
    required: true,
    min: 1,
    max: 31
  },
  dueDay: {
    type: Number,
    required: true,
    min: 1,
    max: 31
  }
});

// Adiciona o plugin AutoIncrement ao schema
cardSchema.plugin(AutoIncrement, { inc_field: 'cardNumber' });

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;