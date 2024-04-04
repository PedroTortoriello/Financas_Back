const express = require("express");
const router = express.Router();
const { insert } = require("../crud"); // Import the insert function from crud.js
const hashPassword = require("../authenticate/cripto");

router.post("/novoUsuario", async function (req, res) {
  try {
    let plainPassword = req.body.password;
    const hash = await hashPassword(plainPassword);
    req.body.password = hash;
    console.log("Senha Hash:", hash);

    // Call the insert function from the crud object
    await insert("login", req.body); // Assuming "login" is the collection name
    
    res.json({ message: "Usuário cadastrado com sucesso!" }).end();
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err);
    res.status(500).json({ message: "Algo deu errado!", error: err.message }).end();
  }
});

module.exports = router;
