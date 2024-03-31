const express = require('express');
const router = express.Router();
const cors = require('cors');
const authenticateToken = require('../authenticate/authenticateToken'); // Importe a função authenticateToken

// Habilitar o uso do CORS em todas as rotas
router.use(cors());

// Handle POST request
router.post('/pags', authenticateToken, async (req, res) => {
  try {
    await crud('Pagamentos', req.body); // Usar a função insert do crud.js
    res.json({ resultado: "Inserido com sucesso." });
  } catch (err) {
    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` });
  }
});

// Handle GET request
router.get('/pags', authenticateToken, async (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  // Adicione outros cabeçalhos CORS, se necessário
  try {
    // Handle GET request
    const retorno = await crud('Pagamentos'); 
    res.json(retorno);
  } catch (err) {
    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` });
  }
});

module.exports = router;
