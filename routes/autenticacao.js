const express = require('express');
const router = express.Router();
const crud = require('../crud');
const { comparePassword } = require('../authenticate/cripto'); // Ajuste conforme necessário
const jwt = require('jsonwebtoken'); // Adicione a biblioteca jwt
const { v4: uuidv4 } = require("uuid");

// Rota de autenticação
router.post('/autenticacao', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ authenticate: false, error: 'Email e senha são obrigatórios' });
  }

  try {
    // Busca o usuário usando a função crud
    const users = await crud('logins', { email: email.toLowerCase() }, 'find'); // Busca com email em minúsculas
    const user = users.length ? users[0] : null;

    if (!user) {
      return res.status(401).json({ authenticate: false, error: 'Usuário não encontrado' });
    }

    // Verifica se a senha está correta
    const passwordMatches = await comparePassword(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ authenticate: false, error: 'Senha incorreta' });
    }

    // Armazena as informações do usuário na sessão
    req.session.session_id = uuidv4();
    req.session.email = user.email;
    req.session.userId = user.id;
    console.log('Sessão antes de salvar:', req.session); // Log para depuração

    // Gera o token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      '3Kf4W6TbAeLrP8Mxikh', // Chave secreta para assinatura do token
      { expiresIn: '1440m' } // Tempo de expiração do token
    );

    // Salva a sessão e envia a resposta
    req.session.save((err) => {
      if (err) {
        console.error('Erro ao salvar sessão:', err);
        console.error('Estado da sessão:', req.session);
        return res.status(500).json({ authenticate: false, error: 'Erro interno ao salvar sessão' });
      }
      res.status(200).json({ authenticate: true, token, message: 'Autenticação bem-sucedida' });
    });

  } catch (error) {
    console.error('Erro ao autenticar:', error);
    res.status(500).json({ authenticate: false, error: 'Erro interno do servidor' });
  }
});

module.exports = router;
