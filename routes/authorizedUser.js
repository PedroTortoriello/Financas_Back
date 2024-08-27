const express = require('express');
const router = express.Router();

const criarRotasAuthorized = (verificaAutenticacao, petvidaConnection, petshopConnection) => {
  router.post('/authorizedUsers', verificaAutenticacao, async (req, res) => {
    try {
      console.log('Sessão no /authorizedUsers POST:', req.session);

      // Verifica se o usuário está autenticado e se a conexão com o banco de dados está definida
      if (!req.session || !(req.session.db === 'petshop' || req.session.db === 'petvida')) {
        console.log('Usuário não autenticado. Sessão:', req.session);
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      let connection;
      if (req.session.db === 'petshop') {
        connection = petshopConnection;
      } else if (req.session.db === 'petvida') {
        connection = petvidaConnection;
      }

      console.log(req.body);

      // Verifica se o e-mail está autorizado
      if (req.body.email && req.body.email.includes('gmail')) {
        res.json({ isAuth: true });
      } else {
        res.json({ isAuth: false });
      }
    } catch (error) {
      console.error('Erro ao verificar usuário autorizado:', error);
      res.status(500).json({ error: 'Erro ao verificar usuário autorizado' });
    }
  });

  return router;
};

module.exports = criarRotasAuthorized;
