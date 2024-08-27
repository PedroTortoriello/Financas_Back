const express = require('express');
const router = express.Router();
const crud = require('../crud'); // Ajuste o caminho conforme necessário
const { v4: uuidv4 } = require('uuid');

// Função para validar a sessão do usuário
const verificarAutenticacao = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }
  next();
};

// Rota para obter todas as finanças do usuário
router.get('/financas', verificarAutenticacao, async (req, res) => {
  try {
    const userId = req.session.userId;
    const finanças = await crud('financas', { userId }, 'find');
    res.status(200).json(finanças);
  } catch (error) {
    console.error('Erro ao buscar finanças:', error);
    res.status(500).json({ error: 'Erro ao buscar finanças' });
  }
});

// Rota para criar um novo registro de finanças
router.post('/financas', verificarAutenticacao, async (req, res) => {
  const { description, amount, month, year, category } = req.body;

  if (!description || !amount || !month || !year) {
    return res.status(400).json({ error: 'Os campos description, amount, month, year são obrigatórios' });
  }

  try {
    const userId = req.session.userId;
    const id = uuidv4(); // Gera um ID único
    const novaFinanca = {
      id,
      description,
      amount: parseFloat(amount), // Converta amount para número se necessário
      month,
      year,
      category,
      userId
    };
    await crud('financas', novaFinanca, 'insert');
    res.status(201).json({ message: 'Registro de finanças criado com sucesso', id });
  } catch (error) {
    console.error('Erro ao inserir finanças:', error);
    res.status(500).json({ error: 'Erro ao inserir finanças' });
  }
});

// Rota para deletar um registro de finanças
router.delete('/financas/:id', verificarAutenticacao, async (req, res) => {
  try {
    const userId = req.session.userId;
    const { id } = req.params;
    const resultado = await crud('financas', { id, userId }, 'delete');

    if (resultado.deletedCount > 0) {
      res.status(200).json({ message: 'Registro de finanças deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Registro não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao deletar finanças:', error);
    res.status(500).json({ error: 'Erro ao deletar finanças' });
  }
});

// Rota para atualizar um registro de finanças
router.put('/financas/:id', verificarAutenticacao, async (req, res) => {
  const { id } = req.params;
  const { description, amount, month, year, category } = req.body;

  if (!description || !amount || !month || !year || !category) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const userId = req.session.userId;
    const resultado = await crud('financas', { id, userId, description, amount: parseFloat(amount), month, year, category }, 'update');

    if (resultado.modifiedCount > 0) {
      res.status(200).json({ message: 'Registro de finanças atualizado com sucesso' });
    } else {
      res.status(404).json({ error: 'Registro não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar finanças:', error);
    res.status(500).json({ error: 'Erro ao atualizar finanças' });
  }
});

module.exports = router;
