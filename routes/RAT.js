const express = require('express');
const router = express.Router();
const cors = require('cors');
const CadastroRAT = require('../schema/cadRat')(); // Importe o modelo e chame a função para obter o modelo
const crud = require("../crud");

// Configuração do middleware CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Substitua pelo domínio da sua aplicação
};

// Use o middleware CORS com as opções configuradas
router.use(cors(corsOptions));

// Rota para lidar com solicitações POST
router.post(`/rats`, async function (req, res) {
  try {
    console.log(req.body)
    // Execute as operações necessárias para processar a solicitação POST
    const retorno = await crud('cadastroRAT', req.body, 'lastCode');
    console.log(retorno)
    await crud('cadastroRAT', req.body, 'insert');
    res.json({ resultado: "Inserido com sucesso." }).end();
  } catch (err) {
    // Lidar com erros e enviar uma resposta adequada
    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` }).end();
  }
});

// Rota para lidar com solicitações GET
router.get(`/rats`, async function (req, res) {
  try {
    // Execute as operações necessárias para processar a solicitação GET
    const retorno = await crud('cadastroRAT', {}, 'find');
    res.json(retorno).end();
  } catch (err) {
    // Lidar com erros e enviar uma resposta adequada
    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` }).end();
  }
});

module.exports = router;
