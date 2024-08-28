const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const crud = require("../crud");
const {hashPassword} = require("../authenticate/cripto");

router.post("/newUsers", async (req, res) => {
  const { email, password, userName } = req.body; // Adiciona userName ao body

  // Validações
  if (!email || !password || !userName) {
    return res.status(400).json({ success: false, error: 'Email, senha e nome de usuário são obrigatórios' });
  }

  if (!email.endsWith('@gmail.com')) {
    return res.status(401).json({ success: false, error: 'Domínio de email inválido' });
  }

  try {
    const id = uuidv4();
    const hashedPassword = await hashPassword(password);

    const userData = {
      id,
      email,
      userName, // Inclui o userName no objeto userData
      password: hashedPassword,
    };

    const retorno = await crud("logins", userData, "newUser");

    res.status(201).json({ success: true, data: retorno, message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

module.exports = router;
