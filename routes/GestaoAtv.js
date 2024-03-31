const express = require('express');
const router = express.Router();
const cors = require('cors');
const CadastroPessoa = require('../schema/cadPessoa')(); 
const crud = require("../crud");


const corsOptions = {
  origin: 'http://localhost:5173',
};


router.use(cors(corsOptions));


router.post(`/gestaoatv`, async function (req, res) {
  try {

    const { codigo, ...outrosDados } = req.body;
    
    const retorno = await crud('cadastroPessoa', { ...outrosDados, codigo }, 'lastCode');
    await crud('cadastroPessoa', { ...outrosDados, codigo }, 'insert');
    res.json({ resultado: "Inserido com sucesso." }).end();
  } catch (err) {

    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` }).end();
  }
});


router.get(`/gestaoatv`, async function (req, res) {
  try {

    const retorno = await crud('cadastroPessoa', {}, 'find');
    res.json(retorno).end();
  } catch (err) {

    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` }).end();
  }
});

module.exports = router;