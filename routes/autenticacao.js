const express = require("express");
const router = express.Router();
const crud = require("../crud");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post("/autenticacao", async function (req, res) {
  try{
    let authenticate = false;
    if(req.body.email && req.body.password) {
      let retorno = await crud('login', req.body, 'authenticate');
      authenticate = retorno.length > 0;

      if (!authenticate) {
        retorno = await crud('login', {email: req.body.email}, 'find');
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
