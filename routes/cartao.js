const express = require('express');
const router = express.Router();

const criarRotasCartoes = (verificaAutenticacao, FinançasConnection) => {
  router.get('/cartoes', verificaAutenticacao, async (req, res) => {
    try {
      let connection;
      if (req.session.db === 'tfinancas_db') {
        connection = FinançasConnection;
      } else {
        console.log('Usuário não autenticado. Sessão:', req.session);
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }
  
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }
  
      // Ajuste: Remover o filtro por data para retornar todos os cartões do usuário
      const sql = 'SELECT name, limite, type, closingDay, dueDay FROM cartoes WHERE userId = ?';
      const [results] = await connection.execute(sql, [userId]);
  
      const Cartoes = results.map(row => ({
        name: row.name,
        limite: row.limite,
        type: row.type,
        closingDay: row.closingDay,
        dueDay: row.dueDay,
      }));
  
      console.log('Dados formatados recebidos da API:', Cartoes);
      res.status(200).json(Cartoes);
    } catch (error) {
      console.error('Erro ao buscar Cartoes:', error);
      res.status(500).json({ error: 'Erro ao buscar Cartoes' });
    }
  });

  router.post('/cartoes', verificaAutenticacao, async (req, res) => {
    console.log('Session data:', req.session); // Adiciona este log para verificar toda a sessão
    const { name, limite, type, closingDay, dueDay } = req.body;
  
    if (!name || !limite || !type || !closingDay || !dueDay) {
      return res.status(400).json({ error: 'Os campos name, limite, type, closingDay, dueDay são obrigatórios' });
    }
  
    try {
      let connection;
      if (req.session.db === 'tfinancas_db') {
        connection = FinançasConnection;
      } else {
        console.log('Usuário não autenticado. Sessão:', req.session);
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }
  
      const userId = req.session.userId;
      console.log('User ID from session:', userId);
      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }
  
      const sql = 'INSERT INTO cartoes (userId, name, limite, type, closingDay, dueDay) VALUES (?, ?, ?, ?, ?, ?)';
      await connection.query(sql, [userId, name, limite, type, closingDay, dueDay]);
  
      res.status(201).json({ message: 'Cartão criado com sucesso' });
    } catch (error) {
      console.error('Erro ao inserir cartão:', error);
      res.status(500).json({ error: 'Erro ao inserir cartão' });
    }
  });
  
  

  return router;
};

module.exports = criarRotasCartoes;
