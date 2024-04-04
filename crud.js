// crud.js

const { MongoClient, ObjectId } = require('mongodb'); // Importe ObjectId do módulo mongodb

const uri = "mongodb+srv://pedrooofreitas:JqzMfX9bhJrcWsyz@pedro.aropozx.mongodb.net/"; // URI de conexão com o banco de dados
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log('Conectado ao banco de dados');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

async function insert(collectionName, data) {
  try {
    const db = client.db('FinançasApp'); // Corrija o nome do banco de dados aqui
    const collection = db.collection(collectionName);
    await collection.insertOne(data);
    console.log('Dados inseridos com sucesso');
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
    throw error; // Lançar o erro para ser tratado na chamada da função
  }
}

async function find(collectionName, query = {}) {
  try {
    const db = client.db('FinançasApp'); // Corrija o nome do banco de dados aqui
    const collection = db.collection(collectionName);
    return await collection.find(query).toArray();
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error; // Lançar o erro para ser tratado na chamada da função
  }
}

async function remove(collectionName, id) {
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    throw new Error('ID inválido: deve ser uma string hexadecimal de 24 caracteres');
  }

  const db = client.db('FinançasApp');
  console.log('Tentando excluir transação com ID:', id);
  const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
  console.log('Resultado da exclusão:', result);
  return result;
}

module.exports = { connect, insert, find, remove, ObjectId }; // Exporte ObjectId junto com as outras funções
