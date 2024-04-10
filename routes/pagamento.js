// Importe o módulo express e o roteador
const express = require('express');
const router = express.Router();
const cors = require('cors');
const authenticateToken = require('../authenticate/authenticateToken'); // Importe a função authenticateToken
const { connect, insert, find, remove } = require("../crud"); // Importe as funções do crud.js

const app = express(); 
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['https://tfinancas.vercel.app', 'https://pagamento-4220a111d481.herokuapp.com'];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE'], // Adicione DELETE aos métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Movendo a configuração de CORS antes das definições de rota
app.use(cors());

// Handle POST request para inserir uma nova transação
router.post('/pags2', authenticateToken, async (req, res) => {
  try {
    await connect(); // Conectar ao banco de dados antes de realizar a operação
    await insert('Financas', req.body); // Usar a função insert do crud.js
    res.json({ resultado: "Inserido com sucesso." });
  } catch (err) {
    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` });
  }
});

// Handle GET request para obter todas as transações
router.get('/pags2', authenticateToken, async (_req, res) => {
  // Adicione outros cabeçalhos CORS, se necessário
  try {
    await connect(); // Conectar ao banco de dados antes de realizar a operação
    const retorno = await find('Financas'); 
    res.json(retorno);
  } catch (err) {
    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` });
  }
});

// Handle DELETE request para remover uma transação pelo ID
router.delete('/pags2/:id', authenticateToken, async (req, res) => {
  try {
    await connect(); // Conectar ao banco de dados antes de realizar a operação
    const id = req.params.id; // Captura o ID do parâmetro da rota
    console.log('Recebido DELETE em /pags2 com ID:', id);
    await remove('Financas', String(id));
    res.json({ resultado: "Transação excluída com sucesso." });
  } catch (err) {
    console.error('Erro ao excluir transação:', err);
    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` });
  }
});

// Exporte o roteador para uso em outros arquivos
module.exports = router;
