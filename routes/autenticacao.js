const express = require("express");
const router = express.Router();
const { insert, find } = require("../crud"); // Importa as funções insert e find diretamente do arquivo crud.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

router.use(cors()); // Use o middleware cors

router.post("/autenticacao", async function (req, res) {
  try{
    let authenticate = false;
    if(req.body.email && req.body.password) {
      let retorno = await find('login', req.body); // Use a função find para buscar o usuário pelo email
      authenticate = retorno.length > 0;

      if (!authenticate) {
        retorno = await find('login', {email: req.body.email}); // Use a função find novamente para buscar o usuário pelo email
        if(retorno.length > 0) {
          const match = await bcrypt.compare(req.body.password, retorno[0].password);
          authenticate = match;
        }
      }
    }

    if(authenticate){
      const token = jwt.sign(req.body, '3Kf4W6TbAeLrP8Mxikh', {
        expiresIn: '1440m'
      });
      res.json({ authenticate: true, token }).end();
    } else {
      res.json({ authenticate: false }).end();
    }
  }
  catch(err){
    res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
  }
}) 

module.exports = router;
