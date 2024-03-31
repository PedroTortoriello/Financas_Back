const mongoose = require("mongoose");

let CadastroRAT;

// Verifica se o modelo já foi definido antes de tentar defini-lo novamente
function mongoSchemaCadastro() {
  if (!CadastroRAT) {
    const cadastroSchema = new mongoose.Schema({
      codigo: {
        type: Number,
        require: true
      },
      Ratsenior: {
        type: String,
        require: true
      },
      RatcodS: {
        type: Number,
        require: false
      }, 
      Stats: {
        type: String,
        require: true
      }, 
      Anexo: {
        type: Buffer,
        require: true
      }, 
      Data: {
        type: String,
        require: true
      },
    });

    // Define the model with the correct name
    CadastroRAT = mongoose.model('cadastroRAT', cadastroSchema);
  }

  return CadastroRAT;
}

module.exports = mongoSchemaCadastro;
