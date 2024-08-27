const express = require('express');
const router = express.Router();
const crud = require('../crud'); // Ajuste o caminho conforme necessário

// Função para validar a sessão do usuário
const verificarAutenticacao = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }
  next();
};

  // Rota para obter todas as categorias do usuário autenticado
  router.get('/category', verificarAutenticacao, async (req, res) => {
    try {
      const userId = req.session.userId;
      const categorias = await crud('Category', { userId }, 'find');
      
      // Extrai categorias únicas
      const categoriasUnicas = [...new Set(categorias.map(cat => cat.category))];

      console.log('Categorias recebidas da API:', categoriasUnicas);
      res.status(200).json(categoriasUnicas);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
  });

  // Rota para criar uma nova categoria
  router.post('/category', verificarAutenticacao, async (req, res) => {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({ error: 'O campo category é obrigatório' });
    }

    try {
      const userId = req.session.userId;
      const novaCategoria = { category, userId };

      await crud('Category', novaCategoria, 'insert');
      res.status(201).json({ message: 'Categoria criada com sucesso' });
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      res.status(500).json({ error: 'Erro ao criar categoria' });
    }
  });

  // Rota para editar uma categoria existente
  router.put('/:oldCategory', verificarAutenticacao, async (req, res) => {
    const { oldCategory } = req.params;
    const { newCategory } = req.body;

    if (!newCategory) {
      return res.status(400).json({ error: 'O campo newCategory é obrigatório' });
    }

    try {
      const userId = req.session.userId;
      const filtro = { category: oldCategory, userId };
      const atualizacao = { $set: { category: newCategory } };

      const resultado = await crud('Category', filtro, 'update', atualizacao);

      if (resultado.modifiedCount > 0) {
        res.status(200).json({ message: 'Categoria atualizada com sucesso' });
      } else {
        res.status(404).json({ error: 'Categoria não encontrada ou não pertence ao usuário' });
      }
    } catch (error) {
      console.error('Erro ao editar categoria:', error);
      res.status(500).json({ error: 'Erro ao editar categoria' });
    }
  });

  // Rota para excluir uma categoria
  router.delete('/:category', verificarAutenticacao, async (req, res) => {
    const { category } = req.params;

    try {
      const userId = req.session.userId;
      const filtro = { category, userId };

      const resultado = await crud('Category', filtro, 'delete');

      if (resultado.deletedCount > 0) {
        res.status(200).json({ message: 'Categoria excluída com sucesso' });
      } else {
        res.status(404).json({ error: 'Categoria não encontrada ou não pertence ao usuário' });
      }
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      res.status(500).json({ error: 'Erro ao excluir categoria' });
    }
  });


module.exports = router;
