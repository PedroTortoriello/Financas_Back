const express = require("express");
const router = express.Router();
bodyParser = require('body-parser');
const authenticateToken = require('../authenticate/authenticateToken')

const autenticacao = require('./autenticacao')
const novoUsuario = require('./newUser')
const rotasSimples = require('./rotasSimples')
const authorizedUsers = require('./authorizedUser')
const Pagamentos = require ('./pagamento')

router.use(bodyParser.json());

router.route('/pags2').post(authenticateToken, Pagamentos)
router.route('/pags2/:id').delete(authenticateToken, Pagamentos)
router.route('/pags2').get(authenticateToken, Pagamentos)
router.route('/autenticacao').post(autenticacao)
router.route('/novoUsuario').post(authenticateToken, novoUsuario)
router.route('/pesquisar').post(authenticateToken, novoUsuario)
router.route('/login').all(authenticateToken, rotasSimples)
router.route('/pesquisarLogin').all(authenticateToken, rotasSimples)
router.route('/authorizedUsers').all(authenticateToken, authorizedUsers)


router.use(express.json())

module.exports = router;


// const fileCsv = require("../Importacao/csvImp");
// const envMsg = require('../whatsapp/sendMsg') 
// const receivedMsg = require('../whatsapp/receivedMsg')
/**
* Rota para whats - teste
*/

/*router.post(`/whatsMensagem`, async function (req, res) {
  try{    
    retorno = await envMsg(req.body.destino, req.body.mensagem);
    res.status(retorno.status).json(retorno.data).end();
  }
  catch(err){
    res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
  }
})*/
