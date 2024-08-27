const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

/**
 * Função CRUD genérica
 * @param {string} tabela - Nome da coleção
 * @param {object} registro - Dados para a operação
 * @param {string} operacao - Tipo da operação a ser realizada
 * @returns {Promise} Resultado da operação
 */
// Função CRUD genérica
async function crud(tabela, registro, operacao) {
  const mongoose = require("mongoose");
  const modelo = mongoose.model(tabela);
  let resultado = "";

  // Busca registro
  if (operacao === "find") {
    resultado = await modelo.find(registro); // Usando `find` para consultas genéricas
  }

  // Insere registro
  if (operacao === "insert") {
    resultado = await new modelo(registro).save();
  }

  // Insere múltiplos registros
  if (operacao === "insertMany") {
    resultado = await modelo.insertMany(registro);
  }

  // Atualiza registro
  if (operacao === "update") {
    resultado = await modelo.updateOne({ _id: registro._id }, registro);
  }

  // Cria usuário
  if (operacao === "newUser") {
    const existingUser = await modelo.findOne({ email: registro.email });
    if (existingUser) {
      return { result: "Usuário já existe na base." };
    } else {
      resultado = await new modelo(registro).save();
      return { result: "Usuário inserido com sucesso." };
    }
  }

  return resultado;
}



module.exports = crud;
