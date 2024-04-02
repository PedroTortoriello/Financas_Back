const express = require("express");
const router = express.Router();
const crud = require("../crud");
const hashPassword = require("../authenticate/cripto");

router.post("/novoUsuario", async function (req, res) {
  try {
    let plainPassword = req.body.password;
    const hash = await hashPassword(plainPassword);
    req.body.password = hash;
    console.log("Senha Hash:", hash);

    // Assuming `crud` function returns some data or message
    const retorno = await crud("login", req.body, "newUser");
    console.log("Retorno from CRUD:", retorno); // Log the returned data or message
    res.send(retorno).end();
  } catch (err) {
    console.error("Error in /novoUsuario route:", err); // Log the error
    res
      .status(500)
      .json({ retorno: `Algo deu errado!, erro: ${err}` })
      .end();
  }
});

module.exports = router;
