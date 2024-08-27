const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const categorySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    autoIncrement: true, // Como o Mongoose não suporta auto-incremento nativamente, plugins podem ser usados.
  },
  category: {
    type: String,
    required: true,
    maxlength: 255,
  },
  userId: {
    type: String,
    required: true,
    maxlength: 36,
  },
});


categorySchema.plugin(AutoIncrement, { inc_field: 'id' });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
