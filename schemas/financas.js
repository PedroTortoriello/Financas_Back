const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
  },
  description: {
    type: String,
    maxlength: 255,
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    min: 0,
    max: 9999999999.99,
  },
  month: {
    type: String,
    maxlength: 20,
  },
  year: {
    type: String,
    maxlength: 4,
  },
  category: {
    type: String,
    maxlength: 255,
  },
  userId: {
    type: String,
    required: true,
    maxlength: 36,
  },
});

const Transaction = mongoose.model('financas', transactionSchema);

module.exports = Transaction;
